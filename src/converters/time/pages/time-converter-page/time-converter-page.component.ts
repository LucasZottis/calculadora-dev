import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CalculatorComponent } from 'src/converters/shared/components/calculator/calculator.component';
import { ConverterPageBase } from 'src/converters/shared/pages/converter-page-base';
import { ConverterTitleComponent } from 'src/converters/shared/components/converter-title/converter-title.component';

import { BreadcrumbsComponent } from 'src/shared/components/breadcrumbs/breadcrumbs.component';
@Component({
  selector: 'time-converter-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    CalculatorComponent,
    ConverterTitleComponent,
    BreadcrumbsComponent
  ],
  templateUrl: './time-converter-page.component.html',
  styleUrl: './time-converter-page.component.scss'
})
export class TimeConverterPageComponent extends ConverterPageBase implements OnInit {
  constructor() {
    super('time', 'tempo', 'Tempo');
    this.setTitle('Conversor de Tempo');
    this.addDescription('Ferramenta para converter entre diferentes unidades de tempo como anos, semanas, dias, horas, minutos, segundos, milissegundos, microssegundos e picossegundos.');
  }

  ngOnInit(): void {
    this.onInit('hora', 'minuto');
  }
}
