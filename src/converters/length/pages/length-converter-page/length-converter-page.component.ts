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
  selector: 'length-converter-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    CalculatorComponent,
    ConverterTitleComponent,
    BreadcrumbsComponent
  ],
  templateUrl: './length-converter-page.component.html',
  styleUrl: './length-converter-page.component.scss'
})
export class LengthConverterPageComponent extends ConverterPageBase implements OnInit {
  constructor() {
    super("length", "comprimento", "Comprimento");
    this.setTitle('Conversor de Comprimento');
    this.addDescription('Ferramenta para converter entre diferentes unidades de comprimento como milímetros, metros, polegadas, pés, milhas, anos-luz e mais. Conversões precisas, instantâneas e confiáveis.');
  }

  ngOnInit(): void {
    this.onInit('metro', 'centimetro');
  }
}
