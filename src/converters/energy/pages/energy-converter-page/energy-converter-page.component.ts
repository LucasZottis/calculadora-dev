import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CalculatorComponent } from 'src/converters/shared/components/calculator/calculator.component';
import { ConverterPageBase } from 'src/converters/shared/pages/converter-page-base';
import { ConverterTitleComponent } from "src/converters/shared/components/converter-title/converter-title.component";

@Component({
  selector: 'energy-converter-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    CalculatorComponent,
    ConverterTitleComponent
],
  templateUrl: './energy-converter-page.component.html',
  styleUrl: './energy-converter-page.component.scss'
})
export class EnergyConverterPageComponent extends ConverterPageBase implements OnInit {
  constructor(
    meta: Meta,
    title: Title,
  ) {
    super(meta, title, "energy", "energia");
    this.setTitle('Conversor de Volume');
    this.addDescription('Ferramenta para converter entre diferentes unidades de volume como mililitros, litros, galões, xícaras, onças fluídas e mais. Conversão precisa e instantânea.');
  }

  ngOnInit(): void {
    this.onInit('joule', 'caloria-alimentar');
  }
}