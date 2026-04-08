import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { UnitConverterFactory } from 'devtoolz-library';
import { ConverterHomePageBase } from 'src/converters/shared/pages/converter-home-page-base';

import { BreadcrumbsComponent } from 'src/shared/components/breadcrumbs/breadcrumbs.component';
@Component({
  selector: 'data-home-page',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    BreadcrumbsComponent
  ],
  templateUrl: './data-home-page.component.html',
  styleUrl: './data-home-page.component.scss'
})
export class DataHomePageComponent extends ConverterHomePageBase implements OnInit {
  constructor() {
    super("data", "Dados");
  }

  ngOnInit() {
    const pageTitle = 'Conversor de Dados';
    const description = 'Converta facilmente entre diferentes unidades de dados, como bytes, kilobytes, megabytes, gigabytes, terabytes e muito mais. Calculadora precisa com explicações detalhadas para apoiar decisões técnicas e acadêmicas.';
    const keywords = 'conversor de dados, kilobytes para megabytes, megabytes para gigabytes, gigabytes para terabytes, calculadora de dados, converter kilobits, converter kilobytes, kilobits para kilobytes, conversão de bits, medida de armazenamento, ferramenta de conversão de dados';

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