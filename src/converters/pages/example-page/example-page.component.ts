import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { CalculatorComponent } from 'src/converters/components/calculator/calculator.component';
import { CalculatorResult } from 'src/converters/models/calculatorResult';
import { ConverterFactoryService } from 'src/converters/services/converter-factory/converter-factory.service';
import { PageBase } from 'src/pages/pageBase';

@Component({
  selector: 'example-page',
  standalone: true,
  imports: [
    FormsModule,
    CalculatorComponent
  ],
  templateUrl: './example-page.component.html',
  styleUrl: './example-page.component.scss'
})
export class ExamplePageComponent extends PageBase implements OnInit {
  // Valores selecionados
  categoriaSelecionada: string = 'tempo';
  unidadeOrigemSelecionada: string = '';
  unidadeDestinoSelecionada: string = '';
  valorOrigem: string = '0';
  valorDestino: string = '0';

  constructor(
    meta: Meta,
    title: Title,
    private converterFactory: ConverterFactoryService
  ) {
    super(meta, title);
    this.addDescription('Ferramenta para conversão de unidades com calculadora interativa. Converta entre diferentes unidades de medida rapidamente.');
    this.setTitle('Conversor de Unidades');
  }

  ngOnInit(): void {
    // Inicializa o componente com as configurações padrão
    this.atualizarTitulo();
  }

  onCategoriaChange(categoria: string): void {
    this.categoriaSelecionada = categoria;
    this.atualizarTitulo();
  }

  onUnidadeOrigemChange(unidade: string): void {
    this.unidadeOrigemSelecionada = unidade;
  }

  onUnidadeDestinoChange(unidade: string): void {
    this.unidadeDestinoSelecionada = unidade;
  }

  onValorChange(valores: CalculatorResult): void {
    this.valorOrigem = valores.sourceValue;
    this.valorDestino = valores.targetValue;
  }

  calcular(valores: CalculatorResult): void {
    // A conversão já é realizada pelo componente Calculator
    console.log('Valores calculados:', valores);
  }

  private atualizarTitulo(): void {
    let titulo = 'Conversor de ';
    let descricao = 'Ferramenta para conversão de ';

    const categoria = this.converterFactory.getCategoryById(this.categoriaSelecionada);
    if (categoria) {
      switch (categoria.id) {
        case 'tempo':
          titulo += 'Tempo';
          descricao += 'unidades de tempo como segundos, minutos, horas e dias. Calculadora interativa com conversão instantânea.';
          break;
        case 'comprimento':
          titulo += 'Comprimento';
          descricao += 'unidades de comprimento como milímetros, centímetros, metros e quilômetros. Cálculo automático e preciso.';
          break;
        case 'peso':
          titulo += 'Peso e Massa';
          descricao += 'unidades de peso e massa como miligramas, gramas, quilogramas e toneladas. Interface intuitiva e fácil de usar.';
          break;
        case 'area':
          titulo += 'Área';
          descricao += 'unidades de área como metros quadrados, hectares e quilômetros quadrados. Calculadora com precisão para medições de terrenos e espaços.';
          break;
        default:
          titulo += 'Unidades';
          descricao += 'diferentes unidades de medida com precisão e facilidade.';
      }
    } else {
      titulo += 'Unidades';
      descricao += 'diferentes unidades de medida com precisão e facilidade.';
    }

    this.setTitle(titulo);
    this.addDescription(descricao);
  }
}