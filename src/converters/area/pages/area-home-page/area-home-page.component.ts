import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { UnitConverterFactory } from 'devtoolz-library';
import { ConverterHomePageBase } from 'src/converters/shared/pages/converter-home-page-base';

@Component({
  selector: 'area-home-page',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
  ],
  templateUrl: './area-home-page.component.html',
  styleUrl: './area-home-page.component.scss'
})
export class AreaHomePageComponent extends ConverterHomePageBase implements OnInit {
  constructor() {
    super("area");
  }

  ngOnInit() {
    const pageTitle = 'Conversor de Área';
    const description = 'Converta facilmente entre diferentes unidades de área, como metros quadrados, centímetros quadrados, hectares, acres, pés quadrados e muito mais. Calculadora precisa com explicações detalhadas para apoiar decisões técnicas e acadêmicas.';
    const keywords = 'conversor de área, metros quadrados para centímetros quadrados, metros quadrados para hectares, metros quadrados para acres, conversão de superfície, unidades de área, calculadora de área, converter metros quadrados, converter hectares, área em pés quadrados, polegadas quadradas para metros quadrados, conversão de terrenos, medida de área, ferramenta de conversão de área';

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