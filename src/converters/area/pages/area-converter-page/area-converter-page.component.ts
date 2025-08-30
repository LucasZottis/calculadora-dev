import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CalculatorComponent } from 'src/converters/shared/components/calculator/calculator.component';
import { ConverterPageBase } from 'src/converters/shared/pages/converter-page-base';
import { ConverterTitleComponent } from "src/converters/shared/components/converter-title/converter-title.component";

@Component({
  selector: 'area-converter-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    CalculatorComponent,
    ConverterTitleComponent
],
  templateUrl: './area-converter-page.component.html',
  styleUrl: './area-converter-page.component.scss'
})
export class AreaConverterPageComponent extends ConverterPageBase implements OnInit {
  constructor(
    meta: Meta,
    title: Title,
  ) {
    super(meta, title, "area", "area");
    this.setTitle('Conversor de Área');
    this.addDescription('Ferramenta para converter entre diferentes unidades de área, como metros quadrados, centímetros quadrados, hectares, acres, pés quadrados e muito mais. Conversão precisa, instantânea e ideal para aplicações técnicas, imobiliárias e acadêmicas.');
  }

  ngOnInit(): void {
    this.onInit('metro-quadrado', 'quilometro-quadrado');
  }
}