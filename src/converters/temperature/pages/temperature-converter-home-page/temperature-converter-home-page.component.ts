import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { UnitConverterFactory } from 'devtoolz-library';
import { ConverterHomePageBase } from 'src/converters/shared/pages/converter-home-page-base';

import { BreadcrumbsComponent } from 'src/shared/components/breadcrumbs/breadcrumbs.component';
@Component({
  selector: 'temperature-converter-home-page',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    BreadcrumbsComponent
  ],
  templateUrl: './temperature-converter-home-page.component.html',
  styleUrl: './temperature-converter-home-page.component.scss'
})
export class TemperatureConverterHomePageComponent extends ConverterHomePageBase implements OnInit {
  constructor() {
    super("temperature", "Temperatura");
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