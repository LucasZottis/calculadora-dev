import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CalculatorComponent } from 'src/converters/shared/components/calculator/calculator.component';
import { ConverterPageBase } from 'src/converters/shared/pages/converter-page-base';
import { ConverterTitleComponent } from "src/converters/shared/components/converter-title/converter-title.component";

import { BreadcrumbsComponent } from 'src/shared/components/breadcrumbs/breadcrumbs.component';
@Component({
  selector: 'temperature-converter-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    CalculatorComponent,
    ConverterTitleComponent,
    BreadcrumbsComponent
  ],
  templateUrl: './temperature-converter-page.component.html',
  styleUrl: './temperature-converter-page.component.scss'
})
export class TemperatureConverterPageComponent extends ConverterPageBase implements OnInit {
  constructor() {
    super("temperature", "temperatura", "Temperatura");
    this.setTitle('Conversor de Temperatura');
    this.addDescription('Ferramenta para converter entre diferentes escalas de temperatura como Celsius, Fahrenheit, Kelvin, Rankine e Réaumur. Conversão precisa, instantânea e confiável.');
  }

  ngOnInit(): void {
    this.onInit('kelvin', 'celsius');
  }
}