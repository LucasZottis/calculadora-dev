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
  selector: 'speed-converter-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    CalculatorComponent,
    ConverterTitleComponent,
    BreadcrumbsComponent
  ],
  templateUrl: './speed-converter-page.component.html',
  styleUrl: './speed-converter-page.component.scss'
})
export class SpeedConverterPageComponent extends ConverterPageBase implements OnInit {
  constructor() {
    super("speed", "velocidade", "Velocidade");
    this.setTitle('Conversor de Velocidade');
    this.addDescription('Ferramenta para converter entre diferentes unidades de velocidade como metros por segundo, quilômetros por hora, milhas por hora, nós, Mach e velocidade da luz. Conversão precisa, instantânea e confiável.');
  }

  ngOnInit(): void {
    this.onInit('metro-por-segundo', 'quilometro-por-hora');
  }
}
