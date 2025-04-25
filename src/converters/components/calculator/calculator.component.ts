import { CommonModule, NgFor } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IConverterService } from 'src/converters/interfaces/IConverterService';
import { CalculatorCategory } from 'src/converters/models/calculatorCategory';
import { CalculatorResult } from 'src/converters/models/calculatorResult';
import { CalculatorUnit } from 'src/converters/models/calculatorUnit';
import { ConverterFactoryService } from 'src/converters/services/converter-factory/converter-factory.service';
import { VolumeConverterService } from 'src/converters/services/volume-converter/volume-converter.service';

@Component({
  selector: 'calculator',
  standalone: true,
  imports: [CommonModule, FormsModule, NgFor],
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {
  @Input() selectedCategoryId: string = 'volume';
  @Input() selectedSourceUnitId: string = '';
  @Input() selectedTargetUnitId: string = '';

  @Output() categoryChange = new EventEmitter<string>();
  @Output() sourceUnitChange = new EventEmitter<string>();
  @Output() targetUnitChange = new EventEmitter<string>();
  @Output() valueChange = new EventEmitter<CalculatorResult>();
  @Output() calculate = new EventEmitter<CalculatorResult>();

  // Valores e estado do componente
  sourceValue: string = '0';
  targetValue: string = '0';
  activeDisplay: 'source' | 'target' = 'source';

  // Estados UI
  showCategorySelector: boolean = false;
  showSourceUnitSelector: boolean = false;
  showTargetUnitSelector: boolean = false;

  // Serviço de conversão atual
  private currentService: IConverterService;

  constructor(private converterFactory: ConverterFactoryService) {
    // Inicializamos com o serviço padrão, será atualizado no ngOnInit
    this.currentService = this.converterFactory.getConverterService(this.selectedCategoryId);
  }

  // Getters para acessar informações conforme a categoria atual
  get categories(): CalculatorCategory[] {
    return this.converterFactory.getCategories();
  }

  get selectedCategory(): CalculatorCategory {
    return this.converterFactory.getCategoryById(this.selectedCategoryId) || this.categories[0];
  }

  get availableUnits(): CalculatorUnit[] {
    return this.currentService.getUnits();
  }

  get sourceUnit(): CalculatorUnit | undefined {
    if (!this.selectedSourceUnitId && this.availableUnits.length > 0) {
      this.selectedSourceUnitId = this.availableUnits[0].id;
    }
    return this.currentService.getUnitById(this.selectedSourceUnitId);
  }

  get targetUnit(): CalculatorUnit | undefined {
    if (!this.selectedTargetUnitId && this.availableUnits.length > 0) {
      this.selectedTargetUnitId = this.availableUnits.length > 1
        ? this.availableUnits[1].id
        : this.availableUnits[0].id;
    }
    return this.currentService.getUnitById(this.selectedTargetUnitId);
  }

  ngOnInit(): void {
    // Inicializar o serviço de conversão com base na categoria selecionada
    this.updateConverterService();

    // Inicializar unidades, se necessário
    this.initializeUnits();
  }

  private updateConverterService(): void {
    try {
      this.currentService = this.converterFactory.getConverterService(this.selectedCategoryId);
    } catch (error) {
      console.error('Erro ao obter serviço de conversão:', error);
      // Fallback para o primeiro serviço disponível
      if (this.categories.length > 0) {
        this.selectedCategoryId = this.categories[0].id;
        this.currentService = this.converterFactory.getConverterService(this.selectedCategoryId);
      }
    }
  }

  private initializeUnits(): void {
    const units = this.currentService.getUnits();
    if (units.length > 0) {
      if (!this.selectedSourceUnitId) {
        this.selectedSourceUnitId = units[0].id;
      }
      if (!this.selectedTargetUnitId) {
        this.selectedTargetUnitId = units.length > 1 ? units[1].id : units[0].id;
      }
    }
  }

  // Manipulação de eventos UI
  onCategorySelect(categoryId: string): void {
    this.selectedCategoryId = categoryId;
    this.showCategorySelector = false;
    this.categoryChange.emit(categoryId);

    // Atualizar o serviço de conversão
    this.updateConverterService();

    // Atualizar unidades padrão para a nova categoria
    this.initializeUnits();
    this.sourceUnitChange.emit(this.selectedSourceUnitId);
    this.targetUnitChange.emit(this.selectedTargetUnitId);

    this.resetCalculator();
  }

  onSourceUnitSelect(unitId: string): void {
    this.selectedSourceUnitId = unitId;
    this.showSourceUnitSelector = false;
    this.sourceUnitChange.emit(unitId);
    this.calculateConversion();
  }

  onTargetUnitSelect(unitId: string): void {
    this.selectedTargetUnitId = unitId;
    this.showTargetUnitSelector = false;
    this.targetUnitChange.emit(unitId);
    this.calculateConversion();
  }

  toggleCategorySelector(): void {
    this.showCategorySelector = !this.showCategorySelector;
    if (this.showCategorySelector) {
      this.showSourceUnitSelector = false;
      this.showTargetUnitSelector = false;
    }
  }

  toggleSourceUnitSelector(): void {
    this.showSourceUnitSelector = !this.showSourceUnitSelector;
    if (this.showSourceUnitSelector) {
      this.showCategorySelector = false;
      this.showTargetUnitSelector = false;
    }
  }

  toggleTargetUnitSelector(): void {
    this.showTargetUnitSelector = !this.showTargetUnitSelector;
    if (this.showTargetUnitSelector) {
      this.showCategorySelector = false;
      this.showSourceUnitSelector = false;
    }
  }

  setActiveDisplay(display: 'source' | 'target'): void {
    this.activeDisplay = display;
  }

  // Manipulação de entrada
  onSourceInputChange(event: Event): void {
    // Validar entrada: permitir apenas números e vírgula
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9,]/g, '');

    // Limitar a uma vírgula
    const commaCount = (input.value.match(/,/g) || []).length;
    if (commaCount > 1) {
      input.value = input.value.replace(/,/g, (match, index, original) => {
        return index === original.indexOf(',') ? match : '';
      });
    }

    this.sourceValue = input.value || '0';
    this.calculateConversion();
  }

  onTargetInputChange(event: Event): void {
    // Validar entrada: permitir apenas números e vírgula
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9,]/g, '');

    // Limitar a uma vírgula
    const commaCount = (input.value.match(/,/g) || []).length;
    if (commaCount > 1) {
      input.value = input.value.replace(/,/g, (match, index, original) => {
        return index === original.indexOf(',') ? match : '';
      });
    }

    this.targetValue = input.value || '0';
    this.calculateReverseConversion();
  }

  // Manipulação de teclado
  onDigitClick(digit: string): void {
    if (this.activeDisplay === 'source') {
      // Para o primeiro dígito, substituir o 0 inicial
      if (this.sourceValue === '0' && digit !== ',') {
        this.sourceValue = digit;
      } else if (digit === ',' && this.sourceValue.includes(',')) {
        // Evitar múltiplas vírgulas
        return;
      } else {
        this.sourceValue += digit;
      }

      this.calculateConversion();
    } else {
      // Para o primeiro dígito, substituir o 0 inicial
      if (this.targetValue === '0' && digit !== ',') {
        this.targetValue = digit;
      } else if (digit === ',' && this.targetValue.includes(',')) {
        // Evitar múltiplas vírgulas
        return;
      } else {
        this.targetValue += digit;
      }

      this.calculateReverseConversion();
    }

    this.emitValueChange();
  }

  onOperationClick(operation: string): void {
    if (operation === 'AC') {
      this.resetCalculator();
      return;
    }

    if (operation === 'delete') {
      if (this.activeDisplay === 'source') {
        if (this.sourceValue.length > 1) {
          this.sourceValue = this.sourceValue.substring(0, this.sourceValue.length - 1);
          if (this.sourceValue === '') {
            this.sourceValue = '0';
          }
        } else {
          this.sourceValue = '0';
        }
        this.calculateConversion();
      } else {
        if (this.targetValue.length > 1) {
          this.targetValue = this.targetValue.substring(0, this.targetValue.length - 1);
          if (this.targetValue === '') {
            this.targetValue = '0';
          }
        } else {
          this.targetValue = '0';
        }
        this.calculateReverseConversion();
      }

      this.emitValueChange();
      return;
    }

    if (operation === '=') {
      this.emitCalculate();
      return;
    }
  }

  // Lógica de conversão delegada ao serviço
  calculateConversion(): void {
    if (!this.sourceUnit || !this.targetUnit) return;

    const sourceValue = parseFloat(this.sourceValue.replace(',', '.'));
    if (isNaN(sourceValue)) return;

    try {
      const targetValue = this.currentService.convert(
        sourceValue,
        this.selectedSourceUnitId,
        this.selectedTargetUnitId
      );
      this.targetValue = targetValue.toFixed(4).replace('.', ',');
      this.emitValueChange();
    } catch (error) {
      console.error('Erro na conversão:', error);
    }
  }

  calculateReverseConversion(): void {
    if (!this.sourceUnit || !this.targetUnit) return;

    const targetValue = parseFloat(this.targetValue.replace(',', '.'));
    if (isNaN(targetValue)) return;

    try {
      const sourceValue = this.currentService.convert(
        targetValue,
        this.selectedTargetUnitId,
        this.selectedSourceUnitId
      );
      this.sourceValue = sourceValue.toFixed(4).replace('.', ',');
      this.emitValueChange();
    } catch (error) {
      console.error('Erro na conversão inversa:', error);
    }
  }

  private emitValueChange(): void {
    this.valueChange.emit({
      sourceValue: this.sourceValue,
      targetValue: this.targetValue,
      sourceUnit: this.selectedSourceUnitId,
      targetUnit: this.selectedTargetUnitId
    });
  }

  private emitCalculate(): void {
    this.calculate.emit({
      sourceValue: this.sourceValue,
      targetValue: this.targetValue,
      sourceUnit: this.selectedSourceUnitId,
      targetUnit: this.selectedTargetUnitId
    });
  }

  private resetCalculator(): void {
    this.sourceValue = '0';
    this.targetValue = '0';
    this.activeDisplay = 'source';
    this.emitValueChange();
  }
}