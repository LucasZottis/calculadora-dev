import { Component } from '@angular/core';

@Component({
  selector: 'cnpj-validator-page',
  standalone: true,
  imports: [],
  templateUrl: './cnpj-validator-page.component.html',
  styleUrl: './cnpj-validator-page.component.scss'
})
export class CnpjValidatorPageComponent {
  result: string | undefined;
  style: string = "";
  cnpj: string = "";

  private getFirstDigit(cnpj: string): string {
    return cnpj.split("")[9];
  }

  private getSecondDigit(cnpj: string): string {
    return cnpj.split("")[10];
  }

  private getDigits(cnpj: string): string {
    return cnpj.substr(0, 9);
  }

  private validateDigit(digits: string, validatorDigit: string, initialValue: number): boolean {
    let resultado = 0;

    digits.split("").forEach(digito => {
      resultado += Number(digito) * initialValue--;
    });

    var resto = resultado % 11;

    if (resto < 2)
      resultado = 0;
    else
      resultado = 11 - resto;

    return resultado == parseInt(validatorDigit);
  }

  private validateFirstDigit(cnpj: string): boolean {
    return this.validateDigit(this.getDigits(cnpj), this.getFirstDigit(cnpj), 10);
  }

  private validateSecondDigit(cnpj: string): boolean {
    return this.validateDigit(this.getDigits(cnpj) + this.getFirstDigit(cnpj), this.getSecondDigit(cnpj), 11);
  }

  private removeMask(value: string): string {
    return value.replaceAll(".", "").replace("/", "").replace("-", "");
  }

  private count(value: string, searchedValue: string): number {
    let count = 0;

    value.split("").forEach(d => {
      if (d === searchedValue)
        count++;
    });

    return count;
  }

  validate(): void {
    let formatoValido = (this.cnpj !== null || this.cnpj !== undefined);

    if (!formatoValido)
      return;

    let cnpj = this.removeMask(this.cnpj);

    if (this.validateFirstDigit(cnpj) && this.validateSecondDigit(cnpj)) {
      this.result = "Válido";
      this.style = "color: var(--primary-color)";
    } else {
      this.result = "Inválido";
      this.style = "color: red";
    }
  }

  onKeypress(e: KeyboardEvent) {
    if (Number.isNaN(Number(e.key)))
      e.preventDefault();
    else {
      let cnpj = this.removeMask(this.cnpj);

      switch (cnpj.length) {
        case 3:
        case 6:
          if (this.count(this.cnpj, ".") !== 2)
            this.cnpj += ".";
          break;
        case 9:
          if (this.count(this.cnpj, ".") !== 1)
            this.cnpj += "-";
          break;
      }
    }
  }

  onPaste(args: ClipboardEvent) {
    this.cnpj = "";
    let value = (args.clipboardData?.getData("text") ?? "");
    for (let index = 0; index < value.length; index++) {
      if (!Number.isNaN(Number(value[index])) && this.cnpj.length < 14) {
        let cnpj = this.removeMask(this.cnpj);

        switch (cnpj.length) {
          case 3:
          case 6:
            if (this.count(this.cnpj, ".") !== 2)
              this.cnpj += ".";
            break;
          case 9:
            if (this.count(this.cnpj, ".") !== 1)
              this.cnpj += "-";
            break;
        }

        this.cnpj += value[index];
      }

    }

    args.preventDefault();
  }
}
