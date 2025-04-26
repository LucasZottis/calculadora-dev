import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PageBase } from 'src/shared/pages/pageBase';

@Component({
  selector: 'time-converter-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './time-converter-page.component.html',
  styleUrl: './time-converter-page.component.scss'
})

export class TimeConverterPageComponent extends PageBase implements OnInit {
  // Valores dos campos separados
  hoursValue: string = '00';
  minutesValue: string = '00';
  secondsValue: string = '00';

  // Valores decimais calculados
  decimalHours: number = 0;
  decimalMinutes: number = 0;
  decimalSeconds: number = 0;

  ngOnInit() {
    this.addDescription('Converta horas, minutos e segundo para diversos formatos.');
    this.setTitle('Conversor de tempo');

    // Inicia a conversão com os valores padrão
    this.convertTimeToDecimal();
  }

  // Processamento da entrada de horas
  onHoursInputChange(): void {
    // Realizar a conversão
    this.convertTimeToDecimal();
  }

  // Processamento da entrada de minutos (com validação)
  onMinutesInputChange(): void {
    // Validar e ajustar valores > 59
    if (this.minutesValue && parseInt(this.minutesValue, 10) > 59) {
      if (parseInt(this.hoursValue, 10) >= 999) {
        this.minutesValue = '59';
      } else {
        const hoursToAdd = Math.floor(parseInt(this.minutesValue, 10) / 60);
        const newMinutesValue = parseInt(this.minutesValue, 10) % 60;

        this.minutesValue = newMinutesValue.toString().padStart(2, '0');

        // Adicionar às horas o valor excedente dos minutos
        const currentHours = parseInt(this.hoursValue || '0', 10);
        this.hoursValue = (currentHours + hoursToAdd).toString().padStart(2, '0');
      }
    }

    // Realizar a conversão
    this.convertTimeToDecimal();
  }

  // Processamento da entrada de segundos (com validação)
  onSecondsInputChange(): void {
    // Validar e ajustar valores > 59
    if (this.secondsValue && parseInt(this.secondsValue, 10) > 59) {
      if (parseInt(this.hoursValue, 10) >= 999) {
        this.secondsValue = '59';
      } else {
        const minutesToAdd = Math.floor(parseInt(this.secondsValue, 10) / 60);
        const newSecondsValue = parseInt(this.secondsValue, 10) % 60;

        this.secondsValue = newSecondsValue.toString().padStart(2, '0');

        // Adicionar aos minutos o valor excedente dos segundos
        const currentMinutes = parseInt(this.minutesValue || '0', 10);
        const newMinutes = currentMinutes + minutesToAdd;

        // Verificar se os novos minutos excedem 59
        if (newMinutes > 59) {
          const hoursToAdd = Math.floor(newMinutes / 60);
          const finalMinutes = newMinutes % 60;

          this.minutesValue = finalMinutes.toString().padStart(2, '0');

          // Adicionar às horas o valor excedente dos minutos
          const currentHours = parseInt(this.hoursValue || '0', 10);
          this.hoursValue = (currentHours + hoursToAdd).toString().padStart(2, '0');
        } else {
          this.minutesValue = newMinutes.toString().padStart(2, '0');
        }
      }
    }

    // Realizar a conversão
    this.convertTimeToDecimal();
  }

  onTimeInputBlur() {
    this.secondsValue = this.formatNumberInput(this.secondsValue);
    this.minutesValue = this.formatNumberInput(this.minutesValue);

    const hourNumber = parseInt(this.hoursValue, 10);
    this.hoursValue = this.formatNumberInput(hourNumber.toString());
  }

  // Formata entrada de números, restringindo a dígitos numéricos e limitando o comprimento
  private formatNumberInput(value: string): string {
    if (!value) return '00';

    // Remover caracteres não numéricos
    const cleanValue = value.replace(/[^0-9]/g, '');

    // Garantir o preenchimento de zeros
    const formatedValue = cleanValue ? cleanValue.padStart(2, '0') : '00';

    return formatedValue
  }

  // Conversão de tempo para decimal
  convertTimeToDecimal(): void {
    const hours = parseInt(this.hoursValue || '0', 10);
    const minutes = parseInt(this.minutesValue || '0', 10);
    const seconds = parseInt(this.secondsValue || '0', 10);

    // Cálculo das horas decimais
    this.decimalHours = hours + (minutes / 60) + (seconds / 3600);

    // Arredondamento para 4 casas decimais
    this.decimalHours = parseFloat(this.decimalHours.toFixed(4));

    // Conversão para minutos e segundos decimais
    this.decimalMinutes = hours * 60 + minutes + (seconds / 60);
    this.decimalMinutes = parseFloat(this.decimalMinutes.toFixed(4));

    this.decimalSeconds = hours * 3600 + minutes * 60 + seconds;
    this.decimalSeconds = parseFloat(this.decimalSeconds.toFixed(4));
  }
}