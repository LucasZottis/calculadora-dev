import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConverterHomePageBase } from 'src/converters/shared/pages/converter-home-page-base';

@Component({
  selector: 'power-converter-home-page',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
  ],
  templateUrl: './power-converter-home-page.component.html',
  styleUrl: './power-converter-home-page.component.scss'
})
export class PowerConverterHomePageComponent extends ConverterHomePageBase implements OnInit {
  constructor() {
    super("power");
  }

  ngOnInit() {
    const pageTitle = 'Conversor de Potência';
    const description = 'Converta facilmente entre diferentes unidades de potência como Watt, Quilowatt, Cavalo-vapor (EUA), Libra-pé por minuto e BTU por minuto. Calculadora precisa com explicações detalhadas e conversões confiáveis.';
    const keywords = 'conversor de potência, watt, quilowatt, cavalo-vapor, horsepower, hp, btu por minuto, libra-pé por minuto, conversão de potência, calculadora de potência';

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
