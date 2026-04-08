import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConverterHomePageBase } from 'src/converters/shared/pages/converter-home-page-base';

import { BreadcrumbsComponent } from 'src/shared/components/breadcrumbs/breadcrumbs.component';
@Component({
  selector: 'time-converter-home-page',
  standalone: true,
  imports: [RouterModule, CommonModule,
    BreadcrumbsComponent
  ],
  templateUrl: './time-converter-home-page.component.html',
  styleUrl: './time-converter-home-page.component.scss'
})
export class TimeConverterHomePageComponent extends ConverterHomePageBase implements OnInit, AfterViewInit {
  constructor() {
    super('time', 'Tempo');
  }

  ngOnInit(): void {
    this.onInit(
      'Conversor de Tempo',
      'Converta facilmente entre diferentes unidades de tempo como anos, semanas, dias, horas, minutos, segundos, milissegundos, microssegundos e picossegundos. Calculadora precisa com explicações detalhadas.',
      'conversor de tempo, converter horas, minutos para segundos, dias para horas, semanas para dias, milissegundos, microssegundos, picossegundos, calculadora de tempo'
    );
  }

  ngAfterViewInit(): void {
    this.navigationHelper();
  }
}
