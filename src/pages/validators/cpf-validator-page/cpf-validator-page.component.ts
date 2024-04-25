import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'cpf-validator-page',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
  ],
  templateUrl: './cpf-validator-page.component.html',
  styleUrl: './cpf-validator-page.component.scss'
})

export class CpfValidatorPageComponent {
  result: string | undefined;
  style: string = "";
  cpf: string = "";

  private getFirstDigit(cpf: string): string {
    return cpf.split("")[10];
  }

  private getSecondDigit(cpf: string): string {
    return cpf.split("")[11];
  }

  private getDigits(cpf: string): string {
    return cpf.substr(0, 9);
  }

  private validateDigit(digits: string, validatorDigit: string, initialValue: number): boolean {
    let resultado = 0;

    digits.split("").forEach(digito => {
      resultado += Number(digito) * initialValue--;
      // valorInicialContador--;

      // if (valorInicialContador < 2)
      //     valorInicialContador = 9;
    });

    var resto = resultado % 11;

    if (resto < 2)
      resultado = 0;
    else
      resultado = 11 - resto;

    return resultado == parseInt(validatorDigit);
  }

  private validateFirstDigit(cpf: string): boolean {
    return this.validateDigit(this.getDigits(cpf), this.getFirstDigit(cpf), 10);
  }

  private validateSecondDigit(cpf: string): boolean {
    return this.validateDigit(this.getDigits(cpf), this.getSecondDigit(cpf), 11);
  }

  private removeMask(cpf: string): string {
    return cpf.replace(".", "").replace("/", "").replace("-", "");
  }

  public validate(): void {
    // let formatoValido = (this.cpf !== null || this.cpf !== undefined);

    // if (!formatoValido)
    //   return;

    // this.cpf = this.removeMask(this.cpf);

    // // var digitosCalculadores = obterDigitos(cpf);
    // // var primeiroDigito = obterPrimeiroDigito(cpf);
    // // var segundoDigito = obterSegundoDigito(cpf);

    // if (this.validateFirstDigit(this.cpf) && this.validateSecondDigit(this.cpf)) {
    //   this.result = "Válido";
    //   this.style = "color: green";
    // } else {
    //   this.result = "Inválido";
    //   this.style = "color: red";
    // }

    console.log(this.cpf);
  }
}