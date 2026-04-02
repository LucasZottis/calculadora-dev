import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CalculatorComponent } from 'src/converters/shared/components/calculator/calculator.component';
import { ConverterPageBase } from 'src/converters/shared/pages/converter-page-base';
import { ConverterTitleComponent } from "src/converters/shared/components/converter-title/converter-title.component";

@Component({
  selector: 'power-converter-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    CalculatorComponent,
    ConverterTitleComponent
  ],
  templateUrl: './power-converter-page.component.html',
  styleUrl: './power-converter-page.component.scss'
})
export class PowerConverterPageComponent extends ConverterPageBase implements OnInit {
  constructor() {
    super("power", "potencia");
    this.setTitle('Conversor de Potência');
    this.addDescription('Ferramenta para converter entre diferentes unidades de potência como Watt, Quilowatt, Cavalo-vapor (EUA), Libra-pé por minuto e BTU por minuto. Conversão precisa, instantânea e confiável.');
  }

  ngOnInit(): void {
    this.onInit('watt', 'quilowatt');
  }
}
