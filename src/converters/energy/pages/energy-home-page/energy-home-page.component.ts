import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { UnitConverterFactory } from 'devtoolz-library';
import { ConverterHomePageBase } from 'src/converters/shared/pages/converter-home-page-base';

@Component({
  selector: 'energy-home-page',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
  ],
  templateUrl: './energy-home-page.component.html',
  styleUrl: './energy-home-page.component.scss'
})
export class EnergyHomePageComponent  extends ConverterHomePageBase implements OnInit {
  constructor(
    factory: UnitConverterFactory,
    meta: Meta,
    title: Title,
  ) {
    super(factory, meta, title, "energy");
  }

  ngOnInit() {
    const pageTitle = 'Conversor de Volume';
    const description = 'Converta facilmente entre diferentes unidades de volume como litros, mililitros, metros cúbicos, galões e muito mais. Calculadora precisa com explicações detalhadas.';
    const keywords = 'conversor de volume, litros para mililitros, metros cúbicos, galões, onças fluídas, conversão de líquidos, calculadora de volume';

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