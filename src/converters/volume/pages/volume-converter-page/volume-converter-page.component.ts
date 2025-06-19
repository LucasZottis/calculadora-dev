import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
import { VolumeConverterService } from 'src/converters/volume/services/volume-converter/volume-converter.service';
import { PageBase } from 'src/shared/pages/pageBase';
import { ConverterFactory, IUnitConverter, Unit } from 'dev-toolz.library';
import { CalculatorResult } from 'src/converters/shared/models/calculatorResult';
import { CalculatorComponent } from "../../../shared/components/calculator/calculator.component";

@Component({
  selector: 'volume-converter-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    CalculatorComponent,
  ],
  templateUrl: './volume-converter-page.component.html',
  styleUrl: './volume-converter-page.component.scss'
})
export class VolumeConverterPageComponent extends PageBase implements OnInit {
  service: IUnitConverter = this._convertersFactory.getConverter('volume');
  list: Unit[] = this.service.getUnits();

  selectedSourceUnit!: Unit;
  selectedTargetUnit!: Unit;

  sourceValue: string = '0';
  targetValue: string = '0';

  // Variáveis para exibir a explicação do cálculo
  mostrarFormula: boolean = false;
  formulaDescricao: string = '';
  formulaCalculo: string = '';

  // Variáveis para links de conversão populares
  // conversoesSugeridas: Array<{ nome: string, url: string }> = [];

  constructor(
    private _volumeService: VolumeConverterService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _convertersFactory: ConverterFactory,
    meta: Meta,
    title: Title,
  ) {
    super(meta, title);
    this.setTitle('Conversor de Volume');
    this.addDescription('Ferramenta para converter entre diferentes unidades de volume como mililitros, litros, galões, xícaras, onças fluídas e mais. Conversão precisa e instantânea.');
  }

  private _updateUrl(): void {
    const url = this._volumeService.generateConversionUrl(
      this.selectedSourceUnit!.id,
      this.selectedTargetUnit.id
    );

    // Atualiza a URL sem recarregar a página
    this._router.navigate(['/conversores/volume', url], { replaceUrl: true });
  }

  private _updateTitle(): void {
    const unidadeOrigem = this._volumeService.getUnitById(this.selectedSourceUnit.id);
    const unidadeDestino = this._volumeService.getUnitById(this.selectedTargetUnit.id);

    if (unidadeOrigem && unidadeDestino) {
      this.setTitle(`Converter ${unidadeOrigem.name} para ${unidadeDestino.name}`);
      this.addDescription(`Ferramenta para converter ${unidadeOrigem.name} para ${unidadeDestino.name}. Cálculo instantâneo e preciso com explicação da fórmula de conversão.`);
    } else {
      this.setTitle('Conversor de Volume');
    }
  }

  private _updateFormula(): void {
    if (!this.sourceValue || this.sourceValue === '0') {
      this.mostrarFormula = false;
      return;
    }

    const unidadeOrigem = this.service.getUnitById(this.selectedSourceUnit.id);
    const unidadeDestino = this.service.getUnitById(this.selectedTargetUnit.id);

    if (!unidadeOrigem || !unidadeDestino) return;

    // Formata os valores com pontos (caso tenha vírgulas)
    const valorOrigemNum = parseFloat(this.sourceValue.toString().replace('.', ','));
    const valorDestinoNum = parseFloat(this.targetValue.toString().replace('.', ','));

    if (isNaN(valorOrigemNum) || isNaN(valorDestinoNum)) return;

    // Obtém a unidade base do conversor atual
    const unidadeBase = this.service.getBaseUnit();
    if (!unidadeBase) return;

    // Gera a descrição da fórmula
    this.formulaDescricao = `Para converter de ${unidadeOrigem.name} (${unidadeOrigem.symbol}) para ${unidadeDestino.name} (${unidadeDestino.symbol}):`;

    // Gera o cálculo detalhado e formatado
    if (unidadeOrigem.conversionFactor === unidadeDestino.conversionFactor) {
      this.formulaCalculo = `${this.sourceValue} ${unidadeOrigem.symbol} = ${this.targetValue} ${unidadeDestino.symbol}`;
    } else {
      // Versão detalhada da fórmula com melhor formatação e quebra de linhas
      const fatorOrigem = unidadeOrigem.conversionFactor || 1;
      const fatorDestino = unidadeDestino.conversionFactor || 1;
      const valorBaseCalc = valorOrigemNum * fatorOrigem;
      const valorBaseStr = valorBaseCalc.toString().replace('.', ',');

      this.formulaCalculo =
        `1. Converter ${this.sourceValue} ${unidadeOrigem.symbol} para ${unidadeBase.name} (unidade base):
   ${this.sourceValue} × ${fatorOrigem} = ${valorBaseStr} ${unidadeBase.symbol}

2. Converter ${valorBaseStr} ${unidadeBase.symbol} para ${unidadeDestino.name}:
   ${valorBaseStr} ÷ ${fatorDestino} = ${this.targetValue} ${unidadeDestino.symbol}`;
    }

    this.mostrarFormula = true;
  }

  ngOnInit(): void {
    this.selectedSourceUnit = this.service.getUnitById('mililitro')!;
    this.selectedTargetUnit = this.service.getUnitById('litro')!;

    // Verifica se a rota tem parâmetros para configurar a conversão
    this._route.params.subscribe(params => {
      const conversionParam = params['conversion'];

      if (conversionParam) {
        const conversionInfo = this._volumeService.parseConversionUrl(conversionParam);
        if (conversionInfo) {
          this.selectedSourceUnit = this.service.getUnitById(conversionInfo.sourceUnitId)!;
          this.selectedTargetUnit = this.service.getUnitById(conversionInfo.targetUnitId)!;
          this._updateTitle();
          // this.gerarConversoesSugeridas();
        } else {
          // Redireciona para a rota padrão se a conversão for inválida
          this._router.navigate(['/conversores/volume']);
        }
      } else {
        // this.gerarConversoesSugeridas();
      }
    });
  }

  onSourceUnitChange(unit: Unit): void {
    this.selectedSourceUnit = unit;
    // this.unidadeOrigemSelecionada = unit.id;
    this._updateUrl();
    this._updateTitle();
    this._updateFormula();
  }

  onTargetUnitChange(unit: Unit): void {
    this.selectedTargetUnit = unit;
    // this.unidadeDestinoSelecionada = unit.id;
    this._updateUrl();
    this._updateTitle();
    this._updateFormula();
  }

  onValueChange(valores: CalculatorResult): void {
    this.sourceValue = valores.sourceValue;
    this.targetValue = valores.targetValue;
    this._updateFormula();
    this.mostrarFormula = true;
  }

  calculate(valores: CalculatorResult): void {
    // A conversão já é realizada pelo componente Calculator
    this._updateFormula();
  }
}