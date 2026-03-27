import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { UnitConverterFactory } from 'devtoolz-library';
import { ConverterHomePageBase } from 'src/converters/shared/pages/converter-home-page-base';

@Component({
  selector: 'temperature-converter-home-page',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
  ],
  templateUrl: './temperature-converter-home-page.component.html',
  styleUrl: './temperature-converter-home-page.component.scss'
})
export class TemperatureConverterHomePageComponent extends ConverterHomePageBase implements OnInit {
  constructor(
    factory: UnitConverterFactory,
    meta: Meta,
    title: Title,
  ) {
    super(factory, meta, title, "temperature");
  }

  ngOnInit() {
    const pageTitle = 'Conversor de Temperatura';
    const description = 'Converta facilmente entre diferentes escalas de temperatura como Celsius, Fahrenheit, Kelvin, Rankine e Réaumur. Calculadora precisa com explicações detalhadas e conversões confiáveis.';
    const keywords = 'conversor de temperatura, Celsius para Fahrenheit, Kelvin, Rankine, Réaumur, escalas térmicas, calculadora de temperatura, conversão de graus';

    this.onInit(
      pageTitle,
      description,
      keywords,
    );
  }

  ngAfterViewInit() {
    this.navigationHelper();
  }
}