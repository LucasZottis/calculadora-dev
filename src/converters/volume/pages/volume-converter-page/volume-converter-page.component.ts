import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CalculatorComponent } from "../../../shared/components/calculator/calculator.component";
import { ConverterPageBase } from 'src/converters/shared/pages/converter-page-base';

@Component({
  selector: 'volume-converter-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    CalculatorComponent,
  ],
  templateUrl: './volume-converter-page.component.html',
  styleUrl: './volume-converter-page.component.scss'
})
export class VolumeConverterPageComponent extends ConverterPageBase implements OnInit {
  constructor(
    meta: Meta,
    title: Title,
  ) {
    super(meta, title, "volume", "volume");
    this.setTitle('Conversor de Volume');
    this.addDescription('Ferramenta para converter entre diferentes unidades de volume como mililitros, litros, galões, xícaras, onças fluídas e mais. Conversão precisa e instantânea.');
  }

  ngOnInit(): void {
    this.onInit('mililitro', 'litro');
  }
}