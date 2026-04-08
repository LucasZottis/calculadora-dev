import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { UnitConverterFactory } from 'devtoolz-library';
import { ConverterHomePageBase } from 'src/converters/shared/pages/converter-home-page-base';

import { BreadcrumbsComponent } from 'src/shared/components/breadcrumbs/breadcrumbs.component';
@Component({
  selector: 'speed-converter-home-page',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    BreadcrumbsComponent
  ],
  templateUrl: './speed-converter-home-page.component.html',
  styleUrl: './speed-converter-home-page.component.scss'
})
export class SpeedConverterHomePageComponent extends ConverterHomePageBase implements OnInit {
  constructor() {
    super("speed", "Velocidade");
  }

  ngOnInit() {
    const pageTitle = 'Conversor de Velocidade';
    const description = 'Converta facilmente entre diferentes unidades de velocidade como metros por segundo, quilômetros por hora, milhas por hora, nós, Mach e velocidade da luz. Calculadora precisa com explicações detalhadas e conversões confiáveis.';
    const keywords = 'conversor de velocidade, metros por segundo, quilômetros por hora, milhas por hora, nós, Mach, velocidade da luz, km/h, mph, m/s, conversão de velocidade';

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
