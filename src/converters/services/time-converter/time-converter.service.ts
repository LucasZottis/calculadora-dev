// src/converters/services/time-converter.service.ts

import { Injectable } from '@angular/core';
import { IConverterService } from 'src/converters/interfaces/IConverterService';
import { CalculatorUnit } from 'src/converters/models/calculatorUnit';

@Injectable({
  providedIn: 'root'
})
export class TimeConverterService implements IConverterService {
  private units: CalculatorUnit[] = [
    { id: 'segundo', name: 'Segundos', symbol: 's', conversionFactor: 1 },
    { id: 'minuto', name: 'Minutos', symbol: 'min', conversionFactor: 60 },
    { id: 'hora', name: 'Horas', symbol: 'h', conversionFactor: 3600 },
    { id: 'dia', name: 'Dias', symbol: 'd', conversionFactor: 86400 }
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

    // Converte para a unidade base (segundos) e depois para a unidade alvo
    const baseValue = value * sourceUnit.conversionFactor!;
    return baseValue / targetUnit.conversionFactor!;
  }
}