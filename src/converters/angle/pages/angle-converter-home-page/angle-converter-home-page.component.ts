import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConverterHomePageBase } from 'src/converters/shared/pages/converter-home-page-base';

@Component({
  selector: 'angle-converter-home-page',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
  ],
  templateUrl: './angle-converter-home-page.component.html',
  styleUrl: './angle-converter-home-page.component.scss'
})
export class AngleConverterHomePageComponent extends ConverterHomePageBase implements OnInit {
  constructor() {
    super("angle");
  }

  ngOnInit() {
    const pageTitle = 'Conversor de Ângulo';
    const description = 'Converta facilmente entre diferentes unidades de ângulo como Graus, Radianos e Grados (gon). Calculadora precisa com explicações detalhadas e conversões confiáveis.';
    const keywords = 'conversor de ângulo, graus para radianos, radianos para graus, grados, gon, conversão de ângulo, calculadora de ângulo';

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
