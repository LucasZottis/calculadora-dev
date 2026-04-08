import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConverterHomePageBase } from 'src/converters/shared/pages/converter-home-page-base';

import { BreadcrumbsComponent } from 'src/shared/components/breadcrumbs/breadcrumbs.component';
@Component({
  selector: 'pressure-home-page',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    BreadcrumbsComponent
  ],
  templateUrl: './pressure-home-page.component.html',
  styleUrl: './pressure-home-page.component.scss'
})
export class PressureHomePageComponent extends ConverterHomePageBase implements OnInit {
  constructor() {
    super("pressure", "Pressão");
  }

  ngOnInit() {
    const pageTitle = 'Conversor de Pressão';
    const description = 'Converta facilmente entre diferentes unidades de pressão como Pascal, Bar, Atmosfera, Quilopascal, Milímetro de mercúrio e PSI. Calculadora precisa com explicações detalhadas e conversões confiáveis.';
    const keywords = 'conversor de pressão, pascal para bar, bar para atmosfera, quilopascal, milímetro de mercúrio, psi, conversão de pressão, calculadora de pressão';

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
