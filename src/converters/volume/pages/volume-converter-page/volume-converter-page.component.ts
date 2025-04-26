import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CalculatorResult } from 'src/converters/shared/models/calculatorResult';
import { VolumeConverterService } from 'src/converters/volume/services/volume-converter/volume-converter.service';
import { PageBase } from 'src/shared/pages/pageBase';
import { CalculatorUnit } from 'src/converters/shared/models/calculatorUnit';
import { CalculatorComponent } from 'src/converters/shared/components/calculator/calculator.component';

@Component({
  selector: 'volume-converter-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    CalculatorComponent
  ],
  templateUrl: './volume-converter-page.component.html',
  styleUrl: './volume-converter-page.component.scss'
})
export class VolumeConverterPageComponent extends PageBase implements OnInit {
  // Valores selecionados
  categoriaSelecionada: string = 'volume';
  unidadeOrigemSelecionada: string = 'mililitros';
  unidadeDestinoSelecionada: string = 'litros';
  valorOrigem: string = '0';
  valorDestino: string = '0';

  // Variáveis para exibir a explicação do cálculo
  mostrarFormula: boolean = false;
  formulaDescricao: string = '';
  formulaCalculo: string = '';

  // Variáveis para links de conversão populares
  conversoesSugeridas: Array<{ nome: string, url: string }> = [];

  constructor(
    meta: Meta,
    title: Title,
    private volumeService: VolumeConverterService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    super(meta, title);
    this.setTitle('Conversor de Volume');
    this.addDescription('Ferramenta para converter entre diferentes unidades de volume como mililitros, litros, galões, xícaras, onças fluídas e mais. Conversão precisa e instantânea.');
  }

  ngOnInit(): void {
    // Verifica se a rota tem parâmetros para configurar a conversão
    this.route.params.subscribe(params => {
      const conversionParam = params['conversion'];
      if (conversionParam) {
        const conversionInfo = this.volumeService.parseConversionUrl(conversionParam);
        if (conversionInfo) {
          this.unidadeOrigemSelecionada = conversionInfo.sourceUnitId;
          this.unidadeDestinoSelecionada = conversionInfo.targetUnitId;
          this.atualizarTitulo();
          this.gerarConversoesSugeridas();
        } else {
          // Redireciona para a rota padrão se a conversão for inválida
          this.router.navigate(['/conversores/volume']);
        }
      } else {
        this.gerarConversoesSugeridas();
      }
    });
  }

  onCategoriaChange(categoria: string): void {
    this.categoriaSelecionada = categoria;
  }

  onUnidadeOrigemChange(unidade: string): void {
    this.unidadeOrigemSelecionada = unidade;
    this.atualizarURL();
    this.atualizarTitulo();
    this.atualizarFormula();
  }

  onUnidadeDestinoChange(unidade: string): void {
    this.unidadeDestinoSelecionada = unidade;
    this.atualizarURL();
    this.atualizarTitulo();
    this.atualizarFormula();
  }

  onValorChange(valores: CalculatorResult): void {
    this.valorOrigem = valores.sourceValue;
    this.valorDestino = valores.targetValue;
    this.atualizarFormula();
    this.mostrarFormula = true;
  }

  calcular(valores: CalculatorResult): void {
    // A conversão já é realizada pelo componente Calculator
    this.atualizarFormula();
  }

  private atualizarURL(): void {
    const url = this.volumeService.generateConversionUrl(
      this.unidadeOrigemSelecionada,
      this.unidadeDestinoSelecionada
    );

    // Atualiza a URL sem recarregar a página
    this.router.navigate(['/conversores/volume', url], { replaceUrl: true });
  }

  private atualizarTitulo(): void {
    const unidadeOrigem = this.volumeService.getUnitById(this.unidadeOrigemSelecionada);
    const unidadeDestino = this.volumeService.getUnitById(this.unidadeDestinoSelecionada);

    if (unidadeOrigem && unidadeDestino) {
      this.setTitle(`Converter ${unidadeOrigem.name} para ${unidadeDestino.name}`);
      this.addDescription(`Ferramenta para converter ${unidadeOrigem.name} para ${unidadeDestino.name}. Cálculo instantâneo e preciso com explicação da fórmula de conversão.`);
    } else {
      this.setTitle('Conversor de Volume');
    }
  }

  private atualizarFormula(): void {
    if (!this.valorOrigem || this.valorOrigem === '0') {
      this.mostrarFormula = false;
      return;
    }

    const unidadeOrigem = this.volumeService.getUnitById(this.unidadeOrigemSelecionada);
    const unidadeDestino = this.volumeService.getUnitById(this.unidadeDestinoSelecionada);

    if (!unidadeOrigem || !unidadeDestino) return;

    // Formata os valores com pontos (caso tenha vírgulas)
    const valorOrigemNum = parseFloat(this.valorOrigem.replace(',', '.'));
    const valorDestinoNum = parseFloat(this.valorDestino.replace(',', '.'));

    if (isNaN(valorOrigemNum) || isNaN(valorDestinoNum)) return;

    // Obtém a unidade base do conversor atual
    const unidadeBase = this.obterUnidadeBase();
    if (!unidadeBase) return;

    // Gera a descrição da fórmula
    this.formulaDescricao = `Para converter de ${unidadeOrigem.name} (${unidadeOrigem.symbol}) para ${unidadeDestino.name} (${unidadeDestino.symbol}):`;

    // Gera o cálculo detalhado e formatado
    if (unidadeOrigem.conversionFactor === unidadeDestino.conversionFactor) {
      this.formulaCalculo = `${this.valorOrigem} ${unidadeOrigem.symbol} = ${this.valorDestino} ${unidadeDestino.symbol}`;
    } else {
      // Versão detalhada da fórmula com melhor formatação e quebra de linhas
      const fatorOrigem = unidadeOrigem.conversionFactor || 1;
      const fatorDestino = unidadeDestino.conversionFactor || 1;
      const valorBaseCalc = valorOrigemNum * fatorOrigem;
      const valorBaseStr = valorBaseCalc.toFixed(4);

      this.formulaCalculo =
        `1. Converter ${this.valorOrigem} ${unidadeOrigem.symbol} para ${unidadeBase.name} (unidade base):
   ${this.valorOrigem} × ${fatorOrigem} = ${valorBaseStr} ${unidadeBase.symbol}

2. Converter ${valorBaseStr} ${unidadeBase.symbol} para ${unidadeDestino.name}:
   ${valorBaseStr} ÷ ${fatorDestino} = ${this.valorDestino} ${unidadeDestino.symbol}`;
    }

    this.mostrarFormula = true;
  }

  /**
    * Obtém a unidade de referência para a explicação da fórmula
    * Usa a unidade de origem selecionada pelo usuário
    */
  private obterUnidadeBase(): CalculatorUnit | null {
    // Usa a unidade origem selecionada como referência para explicar a conversão direta
    return this.volumeService.getUnitById(this.unidadeOrigemSelecionada) ?? null;
  }

  // Método para gerar conversões populares sugeridas
  private gerarConversoesSugeridas(): void {
    // Combinações populares de conversão
    const conversoesFamosas = [
      { origem: 'litros', destino: 'mililitros' },
      { origem: 'mililitros', destino: 'litros' },
      { origem: 'xicara-eua', destino: 'mililitros' },
      { origem: 'galao-eua', destino: 'litros' },
      { origem: 'onca-fluida-eua', destino: 'mililitros' },
      { origem: 'metro-cubico', destino: 'litros' }
    ];

    this.conversoesSugeridas = conversoesFamosas.map(conv => {
      const unidadeOrigem = this.volumeService.getUnitById(conv.origem);
      const unidadeDestino = this.volumeService.getUnitById(conv.destino);
      const url = this.volumeService.generateConversionUrl(conv.origem, conv.destino);

      return {
        nome: `${unidadeOrigem?.name} para ${unidadeDestino?.name}`,
        url: url
      };
    });
  }
}