import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { CalculatorComponent } from 'src/converters/components/calculator/calculator.component';
import { CalculatorCategory } from 'src/converters/models/calculatorCategory';
import { CalculatorUnit } from 'src/converters/models/calculatorUnit';
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
  categorias: CalculatorCategory[] = [
    { id: 'tempo', name: 'Tempo', icon: 'schedule' },
    { id: 'comprimento', name: 'Comprimento', icon: 'straighten' },
    { id: 'peso', name: 'Peso e Massa', icon: 'scale' },
  ];

  unidades: { [categoryId: string]: CalculatorUnit[] } = {
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
    ]
  };

  categoriaSelecionada: string = 'tempo';
  unidadeOrigemSelecionada: string = 'hora';
  unidadeDestinoSelecionada: string = 'minuto';
  valorOrigem: string = '0';
  valorDestino: string = '0';

  constructor(
    meta: Meta,
    title: Title
  ) {
    super(meta, title);
    this.addDescription('Ferramenta para conversão de unidades de tempo, comprimento e peso com calculadora interativa.');
    this.setTitle('Conversor de Unidades');
  }

  ngOnInit(): void {
    // Verifica se as unidades padrão estão definidas
    if (this.unidades[this.categoriaSelecionada] && this.unidades[this.categoriaSelecionada].length > 0) {
      if (!this.unidadeOrigemSelecionada) {
        this.unidadeOrigemSelecionada = this.unidades[this.categoriaSelecionada][0].id;
      }
      if (!this.unidadeDestinoSelecionada) {
        this.unidadeDestinoSelecionada = this.unidades[this.categoriaSelecionada].length > 1
          ? this.unidades[this.categoriaSelecionada][1].id
          : this.unidades[this.categoriaSelecionada][0].id;
      }
    }
  }

  onCategoriaChange(categoria: string): void {
    this.categoriaSelecionada = categoria;
    // Ajusta as unidades padrão para a nova categoria
    if (this.unidades[categoria] && this.unidades[categoria].length > 0) {
      this.unidadeOrigemSelecionada = this.unidades[categoria][0].id;
      this.unidadeDestinoSelecionada = this.unidades[categoria].length > 1
        ? this.unidades[categoria][1].id
        : this.unidades[categoria][0].id;
    }
    this.atualizarTitulo();
  }

  onUnidadeOrigemChange(unidade: string): void {
    this.unidadeOrigemSelecionada = unidade;
  }

  onUnidadeDestinoChange(unidade: string): void {
    this.unidadeDestinoSelecionada = unidade;
  }

  onValorChange(valores: { sourceValue: string, targetValue: string }): void {
    this.valorOrigem = valores.sourceValue;
    this.valorDestino = valores.targetValue;
  }

  calcular(valores: { sourceValue: string, targetValue: string }): void {
    // Já é calculado automaticamente no componente da calculadora
    console.log('Valores calculados:', valores);
  }

  private atualizarTitulo(): void {
    let titulo = 'Conversor de ';

    switch (this.categoriaSelecionada) {
      case 'tempo':
        titulo += 'Tempo';
        this.addDescription('Ferramenta para conversão de unidades de tempo como segundos, minutos, horas e dias. Calculadora interativa com conversão instantânea.');
        break;
      case 'comprimento':
        titulo += 'Comprimento';
        this.addDescription('Ferramenta para conversão de unidades de comprimento como milímetros, centímetros, metros e quilômetros. Cálculo automático e preciso.');
        break;
      case 'peso':
        titulo += 'Peso e Massa';
        this.addDescription('Ferramenta para conversão de unidades de peso e massa como miligramas, gramas, quilogramas e toneladas. Interface intuitiva e fácil de usar.');
        break;
    }

    this.setTitle(titulo);
  }
}