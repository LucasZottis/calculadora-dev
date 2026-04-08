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
  selector: 'data-converter-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    CalculatorComponent,
    ConverterTitleComponent,
    BreadcrumbsComponent
  ],
  templateUrl: './data-converter-page.component.html',
  styleUrl: './data-converter-page.component.scss'
})
export class DataConverterPageComponent extends ConverterPageBase implements OnInit {
  constructor() {
    super("data", "dados", "Dados");
    this.setTitle('Conversor de Dados');
    this.addDescription(
      'Ferramenta para converter entre diferentes unidades de dados, como bits, bytes, kilobytes, megabytes, gigabytes, terabytes e muito mais. \
      Conversão precisa, instantânea e ideal para aplicações técnicas, computacionais e acadêmicas.'
    );
  }

  ngOnInit(): void {
    this.onInit('byte', 'megabyte');
  }
}