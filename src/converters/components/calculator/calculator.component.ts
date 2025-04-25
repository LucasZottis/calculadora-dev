import { CommonModule, NgFor } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalculatorCategory } from 'src/converters/models/calculatorCategory';
import { CalculatorResult } from 'src/converters/models/calculatorResult';
import { CalculatorUnit } from 'src/converters/models/calculatorUnit';

@Component({
  selector: 'calculator',
  standalone: true,
  imports: [CommonModule, FormsModule, NgFor],
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {
  @Input() categories: CalculatorCategory[] = [
    { id: 'tempo', name: 'Tempo', icon: 'schedule' },
    { id: 'comprimento', name: 'Comprimento', icon: 'straighten' },
    { id: 'peso', name: 'Peso e Massa', icon: 'scale' },
    { id: 'area', name: 'Área', icon: 'aspect_ratio' }
  ];

  @Input() units: { [categoryId: string]: CalculatorUnit[] } = {
    'tempo': [
      { id: 'segundo', name: 'Segundos', symbol: 's', conversionFactor: 1 },
      { id: 'minuto', name: 'Minutos', symbol: 'min', conversionFactor: 60 },
      { id: 'hora', name: 'Horas', symbol: 'h', conversionFactor: 3600 },
      { id: 'dia', name: 'Dias', symbol: 'd', conversionFactor: 86400 }
    ],
    'comprimento': [
      { id: 'milimetro', name: 'Milímetros', symbol: 'mm', conversionFactor: 0.001 },
      { id: 'centimetro', name: 'Centímetros', symbol: 'cm', conversionFactor: 0.01 },
      { id: 'metro', name: 'Metros', symbol: 'm', conversionFactor: 1 },
      { id: 'quilometro', name: 'Quilômetros', symbol: 'km', conversionFactor: 1000 }
    ],
    'peso': [
      { id: 'miligrama', name: 'Miligramas', symbol: 'mg', conversionFactor: 0.001 },
      { id: 'grama', name: 'Gramas', symbol: 'g', conversionFactor: 1 },
      { id: 'quilograma', name: 'Quilogramas', symbol: 'kg', conversionFactor: 1000 },
      { id: 'tonelada', name: 'Toneladas', symbol: 't', conversionFactor: 1000000 }
    ],
    'area': [
      { id: 'metro_quadrado', name: 'Metros quadrados', symbol: 'm²', conversionFactor: 1 },
      { id: 'hectare', name: 'Hectares', symbol: 'ha', conversionFactor: 10000 },
      { id: 'quilometro_quadrado', name: 'Quilômetros quadrados', symbol: 'km²', conversionFactor: 1000000 }
    ]
  };

  @Input() selectedCategoryId: string = 'tempo';
  @Input() selectedSourceUnitId: string = '';
  @Input() selectedTargetUnitId: string = '';

  @Output() categoryChange = new EventEmitter<string>();
  @Output() sourceUnitChange = new EventEmitter<string>();
  @Output() targetUnitChange = new EventEmitter<string>();
  @Output() valueChange = new EventEmitter<CalculatorResult>();
  @Output() calculate = new EventEmitter<CalculatorResult>();

  sourceValue: string = '0';
  targetValue: string = '0';
  activeDisplay: 'source' | 'target' = 'source';

  showCategorySelector: boolean = false;
  showSourceUnitSelector: boolean = false;
  showTargetUnitSelector: boolean = false;

  get selectedCategory(): CalculatorCategory {
    return this.categories.find(c => c.id === this.selectedCategoryId) || this.categories[0];
  }

  get availableUnits(): CalculatorUnit[] {
    return this.units[this.selectedCategoryId] || [];
  }

  get sourceUnit(): CalculatorUnit {
    if (!this.selectedSourceUnitId && this.availableUnits.length > 0) {
      this.selectedSourceUnitId = this.availableUnits[0].id;
    }
    return this.availableUnits.find(u => u.id === this.selectedSourceUnitId) || this.availableUnits[0];
  }

  get targetUnit(): CalculatorUnit {
    if (!this.selectedTargetUnitId && this.availableUnits.length > 0) {
      this.selectedTargetUnitId = this.availableUnits.length > 1 ? this.availableUnits[1].id : this.availableUnits[0].id;
    }
    return this.availableUnits.find(u => u.id === this.selectedTargetUnitId) || this.availableUnits[0];
  }

  ngOnInit(): void {
    // Inicialização das unidades
    if (this.availableUnits.length > 0) {
      if (!this.selectedSourceUnitId) {
        this.selectedSourceUnitId = this.availableUnits[0].id;
      }
      if (!this.selectedTargetUnitId) {
        this.selectedTargetUnitId = this.availableUnits.length > 1 ? this.availableUnits[1].id : this.availableUnits[0].id;
      }
    }
  }

  onCategorySelect(categoryId: string): void {
    this.selectedCategoryId = categoryId;
    this.showCategorySelector = false;
    this.categoryChange.emit(categoryId);

    // Atualizar unidades padrão para a nova categoria
    if (this.availableUnits.length > 0) {
      this.selectedSourceUnitId = this.availableUnits[0].id;
      this.selectedTargetUnitId = this.availableUnits.length > 1 ? this.availableUnits[1].id : this.availableUnits[0].id;

      this.sourceUnitChange.emit(this.selectedSourceUnitId);
      this.targetUnitChange.emit(this.selectedTargetUnitId);
    }

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

  calculateConversion(): void {
    if (!this.sourceUnit || !this.targetUnit) return;

    const sourceValue = parseFloat(this.sourceValue.replace(',', '.'));
    if (isNaN(sourceValue)) return;

    // Converte para a unidade base e depois para a unidade alvo
    const baseValue = sourceValue * (this.sourceUnit.conversionFactor || 1);
    const targetValue = baseValue / (this.targetUnit.conversionFactor || 1);

    this.targetValue = targetValue.toFixed(4).replace('.', ',');
    this.emitValueChange();
  }

  calculateReverseConversion(): void {
    if (!this.sourceUnit || !this.targetUnit) return;

    const targetValue = parseFloat(this.targetValue.replace(',', '.'));
    if (isNaN(targetValue)) return;

    // Converte para a unidade base e depois para a unidade de origem
    const baseValue = targetValue * (this.targetUnit.conversionFactor || 1);
    const sourceValue = baseValue / (this.sourceUnit.conversionFactor || 1);

    this.sourceValue = sourceValue.toFixed(4).replace('.', ',');
    this.emitValueChange();
  }

  private emitValueChange(): void {
    this.valueChange.emit({
      sourceValue: this.sourceValue,
      targetValue: this.targetValue,
      sourceUnit: this.sourceUnit.id,
      targetUnit: this.targetUnit.id
    });
  }

  private emitCalculate(): void {
    this.calculate.emit({
      sourceValue: this.sourceValue,
      targetValue: this.targetValue,
      sourceUnit: this.sourceUnit.id,
      targetUnit: this.targetUnit.id
    });
  }

  private resetCalculator(): void {
    this.sourceValue = '0';
    this.targetValue = '0';
    this.activeDisplay = 'source';

    this.emitValueChange();
  }
}