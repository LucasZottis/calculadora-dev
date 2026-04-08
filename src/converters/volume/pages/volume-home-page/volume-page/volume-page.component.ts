import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { UnitConverterFactory } from 'devtoolz-library';
import { ConverterHomePageBase } from 'src/converters/shared/pages/converter-home-page-base';

import { BreadcrumbsComponent } from 'src/shared/components/breadcrumbs/breadcrumbs.component';
@Component({
  selector: 'volume-page',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    BreadcrumbsComponent
  ],
  templateUrl: './volume-page.component.html',
  styleUrl: './volume-page.component.scss'
})
export class VolumePageComponent extends ConverterHomePageBase implements OnInit {
  constructor() {
    super("volume", "Volume");
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