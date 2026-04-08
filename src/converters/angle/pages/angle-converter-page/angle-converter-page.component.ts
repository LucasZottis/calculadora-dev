import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CalculatorComponent } from 'src/converters/shared/components/calculator/calculator.component';
import { ConverterPageBase } from 'src/converters/shared/pages/converter-page-base';
import { ConverterTitleComponent } from "src/converters/shared/components/converter-title/converter-title.component";

import { BreadcrumbsComponent } from 'src/shared/components/breadcrumbs/breadcrumbs.component';
@Component({
  selector: 'angle-converter-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    CalculatorComponent,
    ConverterTitleComponent,
    BreadcrumbsComponent
  ],
  templateUrl: './angle-converter-page.component.html',
  styleUrl: './angle-converter-page.component.scss'
})
export class AngleConverterPageComponent extends ConverterPageBase implements OnInit {
  constructor() {
    super("angle", "angulo", "Ângulo");
    this.setTitle('Conversor de Ângulo');
    this.addDescription('Ferramenta para converter entre diferentes unidades de ângulo como Graus, Radianos e Grados (gon). Conversão precisa, instantânea e confiável.');
  }

  ngOnInit(): void {
    this.onInit('grau', 'radiano');
  }
}
