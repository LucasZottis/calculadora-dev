import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { Unit } from 'devtoolz-library';
import { inject } from '@angular/core';
import { PageBase } from 'src/shared/pages/pageBase';
import { CalculatorComponent } from 'src/converters/shared/components/calculator/calculator.component';
import { ConverterTitleComponent } from 'src/converters/shared/components/converter-title/converter-title.component';
import { UnitUrlFormatterService } from 'src/converters/shared/services/unit-url-formatter.service';
import { CalculatorResult } from 'src/converters/shared/models/calculatorResult';
import { TimeConverterService } from '../../services/time-converter.service';

@Component({
  selector: 'time-converter-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    CalculatorComponent,
    ConverterTitleComponent,
  ],
  templateUrl: './time-converter-page.component.html',
  styleUrl: './time-converter-page.component.scss'
})
export class TimeConverterPageComponent extends PageBase implements OnInit {
  private readonly _route: ActivatedRoute = inject(ActivatedRoute);
  private readonly _router: Router = inject(Router);
  private readonly _urlFormatter: UnitUrlFormatterService = inject(UnitUrlFormatterService);

  protected readonly timeService: TimeConverterService = inject(TimeConverterService);

  protected selectedSourceUnit!: Unit;
  protected selectedTargetUnit!: Unit;

  protected sourceValue: string = '0';
  protected targetValue: string = '0';

  protected showFormula: boolean = false;
  protected formulaDescription: string = '';
  protected formulaCalculation: string = '';

  constructor() {
    super();
    const units = this.timeService.getUnits();
    this.selectedSourceUnit = units[0]; // ano
    this.selectedTargetUnit = units[3]; // hora
  }

  ngOnInit(): void {
    this.setTitle('Conversor de Tempo');
    this.addDescription('Ferramenta para converter entre diferentes unidades de tempo como anos, semanas, dias, horas, minutos, segundos, milissegundos, microssegundos e picossegundos.');

    this._route.params.subscribe(params => {
      const conversionParam = params['conversion'];
      if (conversionParam) {
        const info = this._urlFormatter.parseConversionUrl(conversionParam);
        if (info) {
          const source = this.timeService.getUnitById(info.sourceUnitId);
          const target = this.timeService.getUnitById(info.targetUnitId);
          if (!source || !target) {
            this._router.navigate(['/conversores/tempo']);
            return;
          }
          this.selectedSourceUnit = source;
          this.selectedTargetUnit = target;
          this._updateTitle();
        } else {
          this._router.navigate(['/conversores/tempo']);
        }
      }
    });
  }

  protected onSourceUnitChange(unit: Unit): void {
    this.selectedSourceUnit = unit;
    this._afterUnitChanged();
  }

  protected onTargetUnitChange(unit: Unit): void {
    this.selectedTargetUnit = unit;
    this._afterUnitChanged();
  }

  protected onValueChange(result: CalculatorResult): void {
    this.sourceValue = result.sourceValue;
    this.targetValue = result.targetValue;
    this._updateFormula();
    this.showFormula = true;
  }

  private _afterUnitChanged(): void {
    this._updateUrl();
    this._updateTitle();
    this._updateFormula();
  }

  private _updateUrl(): void {
    const url = this._urlFormatter.generateConversionUrl(
      this.selectedSourceUnit.id,
      this.selectedTargetUnit.id
    );
    this._router.navigate(['/conversores/tempo/' + url], { replaceUrl: true });
  }

  private _updateTitle(): void {
    this.setTitle(`Converter ${this.selectedSourceUnit.name} para ${this.selectedTargetUnit.name}`);
    this.addDescription(
      `Ferramenta para converter ${this.selectedSourceUnit.name} para ${this.selectedTargetUnit.name}. Cálculo instantâneo e preciso com explicação da fórmula de conversão.`
    );
  }

  private _updateFormula(): void {
    if (!this.sourceValue || this.sourceValue === '0') {
      this.showFormula = false;
      return;
    }

    const sourceNum = parseFloat(this.sourceValue.replace(',', '.'));
    const targetNum = parseFloat(this.targetValue.replace(',', '.'));

    if (isNaN(sourceNum) || isNaN(targetNum)) return;

    const base = this.timeService.getBaseUnit();
    const src = this.selectedSourceUnit;
    const tgt = this.selectedTargetUnit;

    this.formulaDescription = `Para converter de ${src.name} (${src.symbol}) para ${tgt.name} (${tgt.symbol}):`;

    if (src.conversionFactor === tgt.conversionFactor) {
      this.formulaCalculation = `${this.sourceValue} ${src.symbol} = ${this.targetValue} ${tgt.symbol}`;
    } else {
      const baseVal = sourceNum * src.conversionFactor;
      const baseValStr = baseVal.toString().replace('.', ',');
      this.formulaCalculation =
        `1. Converter ${this.sourceValue} ${src.symbol} para ${base.name} (unidade base):\n` +
        `   ${this.sourceValue} × ${src.conversionFactor} = ${baseValStr} ${base.symbol}\n` +
        `2. Converter ${baseValStr} ${base.symbol} para ${tgt.name}:\n` +
        `   ${baseValStr} ÷ ${tgt.conversionFactor} = ${this.targetValue} ${tgt.symbol}`;
    }

    this.showFormula = true;
  }
}
