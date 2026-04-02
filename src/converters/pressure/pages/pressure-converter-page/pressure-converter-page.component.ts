import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CalculatorComponent } from 'src/converters/shared/components/calculator/calculator.component';
import { ConverterPageBase } from 'src/converters/shared/pages/converter-page-base';
import { ConverterTitleComponent } from 'src/converters/shared/components/converter-title/converter-title.component';

@Component({
  selector: 'pressure-converter-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    CalculatorComponent,
    ConverterTitleComponent
  ],
  templateUrl: './pressure-converter-page.component.html',
  styleUrl: './pressure-converter-page.component.scss'
})
export class PressureConverterPageComponent extends ConverterPageBase implements OnInit {
  constructor() {
    super("pressure", "pressao");
    this.setTitle('Conversor de Pressão');
    this.addDescription('Ferramenta para converter entre diferentes unidades de pressão como Pascal, Bar, Atmosfera, Quilopascal, Milímetro de mercúrio e PSI. Conversão precisa, instantânea e confiável.');
  }

  ngOnInit(): void {
    this.onInit('pascal', 'bar');
  }
}
