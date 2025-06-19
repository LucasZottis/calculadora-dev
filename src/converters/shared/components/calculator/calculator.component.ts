// src/converters/shared/components/calculator/calculator.component.ts
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConverterFactory, IUnitConverter, Unit } from 'dev-toolz.library';
import { CalculatorResult } from 'src/converters/shared/models/calculatorResult';

@Component({
  selector: 'calculator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit, OnDestroy {
  private currentConverter: IUnitConverter;
  private documentClickListener: any;
  private _clearValue: boolean = false;

  @Input() selectedCategoryId: string = 'volume';
  @Input() selectedSourceUnitId: string = '';
  @Input() selectedTargetUnitId: string = '';

  @Output() categoryChange = new EventEmitter<string>();
  @Output() sourceUnitChange = new EventEmitter<Unit>();
  @Output() targetUnitChange = new EventEmitter<Unit>();
  @Output() valueChange = new EventEmitter<CalculatorResult>();
  @Output() calculate = new EventEmitter<CalculatorResult>();

  sourceValue: string = '0';
  targetValue: string = '0';

  activeDisplay: 'source' | 'target' = 'source';

  showSourceUnitSelector: boolean = false;
  showTargetUnitSelector: boolean = false;

  constructor(private converterFactory: ConverterFactory) {
    this.currentConverter = this.converterFactory.getConverter(this.selectedCategoryId);
  }

  get availableUnits(): Unit[] {
    return this.currentConverter.getUnits();
  }

  get sourceUnit(): Unit | undefined {
    if (!this.selectedSourceUnitId && this.availableUnits.length > 0) {
      this.selectedSourceUnitId = this.availableUnits[0].id;
    }
    return this.currentConverter.getUnitById(this.selectedSourceUnitId);
  }

  get targetUnit(): Unit | undefined {
    if (!this.selectedTargetUnitId && this.availableUnits.length > 0) {
      this.selectedTargetUnitId = this.availableUnits.length > 1
        ? this.availableUnits[1].id
        : this.availableUnits[0].id;
    }
    return this.currentConverter.getUnitById(this.selectedTargetUnitId);
  }

  private updateConverter(): void {
    try {
      this.currentConverter = this.converterFactory.getConverter(this.selectedCategoryId);
    } catch (error) {
      console.error('Erro ao obter conversor:', error);
    }
  }

  private initializeUnits(): void {
    const units = this.currentConverter.getUnits();
    if (units.length > 0) {
      if (!this.selectedSourceUnitId) {
        this.selectedSourceUnitId = units[0].id;
      }
      if (!this.selectedTargetUnitId) {
        this.selectedTargetUnitId = units.length > 1 ? units[1].id : units[0].id;
      }
    }
  }

  private onDocumentClick(event: MouseEvent): void {
    if (!this.showSourceUnitSelector && !this.showTargetUnitSelector) {
      return;
    }

    const target = event.target as HTMLElement;
    const isClickInsideSourceSelector = this.isClickInsideElement(target, 'source-unit-selector-mini');
    const isClickInsideTargetSelector = this.isClickInsideElement(target, 'target-unit-selector-mini');
    const isClickInsideDropdown = target.closest('.unit-dropdown') !== null;

    if (!isClickInsideSourceSelector && !isClickInsideTargetSelector && !isClickInsideDropdown) {
      this.showSourceUnitSelector = false;
      this.showTargetUnitSelector = false;
    }
  }

  private isClickInsideElement(element: HTMLElement, className: string): boolean {
    return element.classList.contains(className) || element.closest(`.${className}`) !== null;
  }

  private emitValueChange(): void {
    this.valueChange.emit({
      sourceValue: this.sourceValue,
      targetValue: this.targetValue,
      sourceUnit: this.selectedSourceUnitId,
      targetUnit: this.selectedTargetUnitId
    });
  }

  private _convert(value: string): string {
    if (!this.sourceUnit || !this.targetUnit)
      return '0';

    const parsedValue = parseFloat(value.replace(',', '.'));

    if (isNaN(parsedValue))
      return '0';

    try {
      const result = this.currentConverter.convert(
        parsedValue,
        this.selectedSourceUnitId,
        this.selectedTargetUnitId
      );

      // return result.toFixed(4).replace('.', ',');
      const stringResult = result.toString().replace('.', ',');
      return stringResult;
    } catch (error) {
      console.error('Erro na conversão:', error);
      return '0';
    }
  }

  private emitCalculate(): void {
    this.calculate.emit({
      sourceValue: this.sourceValue,
      targetValue: this.targetValue,
      sourceUnit: this.selectedSourceUnitId,
      targetUnit: this.selectedTargetUnitId
    });
  }

  // Método para posicionar o dropdown de unidades
  private positionDropdown(type: 'source' | 'target'): void {
    const dropdown = document.querySelector(`.unit-dropdown`);
    const trigger = document.querySelector(`.${type === 'source' ? 'source' : 'target'}-unit-selector-mini`);

    if (dropdown && trigger) {
      const rect = trigger.getBoundingClientRect();
      (dropdown as HTMLElement).style.top = `${rect.bottom}px`;
      (dropdown as HTMLElement).style.left = `${rect.left}px`;
    }
  }

  private _setSourceValue(value: string): void {
    this.sourceValue = value || '0';
    this.targetValue = this._convert(this.sourceValue);
    this.emitValueChange();
  }

  private _setTargetValue(value: string): void {
    this.targetValue = value || '0';
    this.sourceValue = this._convert(this.targetValue);
    this.emitValueChange();
  }

  private _inputChanged(input: HTMLInputElement, callback: (value: string) => void): void {
    input.value = input.value.replace(/[^0-9,]/g, '');
    const commaCount = (input.value.match(/,/g) || []).length;

    if (commaCount > 1) {
      input.value = input.value.replace(/,/g, (match, index, original) => {
        return index === original.indexOf(',') ? match : '';
      });
    }

    // this._setSourceValue(input.value || '0');
    callback(input.value || '0');
  }

  ngOnInit(): void {
    this.updateConverter();
    this.initializeUnits();

    this.documentClickListener = (event: MouseEvent) => this.onDocumentClick(event);
    document.addEventListener('click', this.documentClickListener);
  }

  ngOnDestroy(): void {
    document.removeEventListener('click', this.documentClickListener);
  }

  onSourceUnitSelect(unitId: string): void {
    this.selectedSourceUnitId = unitId;
    this.showSourceUnitSelector = false;
    const unit = this.currentConverter.getUnitById(unitId);
    this.sourceUnitChange.emit(unit);

    if (this.activeDisplay === 'source') {
      const input = document.getElementById('source-input') as HTMLInputElement;
      this._inputChanged(input, value => this._setSourceValue(value));
    } else {
      const input = document.getElementById('target-input') as HTMLInputElement;
      this._inputChanged(input, value => this._setTargetValue(value));
    }
  }

  onTargetUnitSelect(unitId: string): void {
    this.selectedTargetUnitId = unitId;
    this.showTargetUnitSelector = false;
    const unit = this.currentConverter.getUnitById(unitId);
    this.targetUnitChange.emit(unit);

    if (this.activeDisplay === 'source') {
      const input = document.getElementById('source-input') as HTMLInputElement;
      this._inputChanged(input, value => this._setSourceValue(value));
    } else {
      const input = document.getElementById('target-input') as HTMLInputElement;
      this._inputChanged(input, value => this._setTargetValue(value));
    }
  }

  // Método para mostrar os dropdowns das unidades de origem
  toggleSourceUnitSelectorDropDown(event?: MouseEvent): void {
    if (event) {
      event.stopPropagation();
    }

    this.showSourceUnitSelector = !this.showSourceUnitSelector;

    if (this.showSourceUnitSelector) {
      this.showTargetUnitSelector = false;
      setTimeout(() => this.positionDropdown('source'), 0);
    }
  }

  // Método para mostrar os dropdowns das unidades de destino
  toggleTargetUnitSelectorDropDown(event?: MouseEvent): void {
    if (event) {
      event.stopPropagation();
    }
    this.showTargetUnitSelector = !this.showTargetUnitSelector;
    if (this.showTargetUnitSelector) {
      this.showSourceUnitSelector = false;
      setTimeout(() => this.positionDropdown('target'), 0);
    }
  }

  // Define o display ativo (source ou target)
  setActiveDisplay(display: 'source' | 'target'): void {
    this._clearValue = this.activeDisplay !== display;
    this.activeDisplay = display;
  }

  onSourceInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this._inputChanged(input, value => this._setSourceValue(value));
  }

  onTargetInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this._inputChanged(input, value => this._setTargetValue(value));
  }

  onKeyDown(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;

    if (this._clearValue) {
      input.value = '';
      this._clearValue = false;
    }
  }

  onDigitClick(digit: string): void {
    const input = document.getElementById(`${this.activeDisplay}-input`) as HTMLInputElement;

    if (this._clearValue) {
      input.value = '';
      this._clearValue = false;
    }

    input.value = input.value === '0' ? digit : input.value + digit;

    if (this.activeDisplay === 'source')
      this._inputChanged(input, value => this._setSourceValue(value));
    else
      this._inputChanged(input, value => this._setTargetValue(value));
  }

  onClickBackspace(): void {
    const input = document.getElementById(`${this.activeDisplay}-input`) as HTMLInputElement;

    if (this._clearValue) {
      input.value = '';
      this._clearValue = false;
    }

    input.value = input.value.substring(0, input.value.length - 1);

    if (input.value === '') {
      input.value = '0';
    }

    if (this.activeDisplay === 'source')
      this._inputChanged(input, value => this._setSourceValue(value));
    else
      this._inputChanged(input, value => this._setTargetValue(value));
  }

  onClickResetCalculator(): void {
    this.sourceValue = '0';
    this.targetValue = '0';
    this.activeDisplay = 'source';
    this.emitValueChange();
  }
}