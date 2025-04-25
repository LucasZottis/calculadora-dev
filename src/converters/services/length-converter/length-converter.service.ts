// src/converters/services/length-converter.service.ts

import { Injectable } from '@angular/core';
import { IConverterService } from 'src/converters/interfaces/IConverterService';
import { CalculatorUnit } from 'src/converters/models/calculatorUnit';

@Injectable({
  providedIn: 'root'
})
export class LengthConverterService implements IConverterService {
  private units: CalculatorUnit[] = [
    { id: 'milimetro', name: 'Milímetros', symbol: 'mm', conversionFactor: 0.001 },
    { id: 'centimetro', name: 'Centímetros', symbol: 'cm', conversionFactor: 0.01 },
    { id: 'metro', name: 'Metros', symbol: 'm', conversionFactor: 1 },
    { id: 'quilometro', name: 'Quilômetros', symbol: 'km', conversionFactor: 1000 }
  ];

  getUnits(): CalculatorUnit[] {
    return this.units;
  }

  getUnitById(unitId: string): CalculatorUnit | undefined {
    return this.units.find(unit => unit.id === unitId);
  }

  convert(value: number, sourceUnitId: string, targetUnitId: string): number {
    const sourceUnit = this.getUnitById(sourceUnitId);
    const targetUnit = this.getUnitById(targetUnitId);

    if (!sourceUnit || !targetUnit) {
      throw new Error('Unidades não encontradas');
    }

    // Converte para a unidade base (metros) e depois para a unidade alvo
    const baseValue = value * sourceUnit.conversionFactor!;
    return baseValue / targetUnit.conversionFactor!;
  }
}