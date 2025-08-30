import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CalculatorComponent } from 'src/converters/shared/components/calculator/calculator.component';
import { ConverterPageBase } from 'src/converters/shared/pages/converter-page-base';
import { ConverterTitleComponent } from "src/converters/shared/components/converter-title/converter-title.component";

@Component({
  selector: 'weight-mass-converter-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    CalculatorComponent,
    ConverterTitleComponent
],
  templateUrl: './weight-mass-converter-page.component.html',
  styleUrl: './weight-mass-converter-page.component.scss'
})
export class WeightMassConverterPageComponent extends ConverterPageBase implements OnInit {
  constructor(
    meta: Meta,
    title: Title,
  ) {
    super(meta, title, "weight-mass", "peso-e-massa");
    this.setTitle('Conversor de Peso e Massa');
    this.addDescription('Ferramenta para converter entre diferentes unidades de peso e massa como gramas, quilogramas, libras, onças e mais. Conversão precisa e instantânea.');
  }

  ngOnInit(): void {
    this.onInit('grama', 'quilograma');
  }
}