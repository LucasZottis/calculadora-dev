import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ConverterFactory } from 'dev-toolz.library';
import { ConverterHomePageBase } from 'src/converters/shared/pages/converter-home-page-base';

@Component({
  selector: 'volume-page',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
  ],
  templateUrl: './volume-page.component.html',
  styleUrl: './volume-page.component.scss'
})
export class VolumePageComponent extends ConverterHomePageBase implements OnInit {
  constructor(
    factory: ConverterFactory,
    meta: Meta,
    title: Title,
  ) {
    super(factory, meta, title, "volume");
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