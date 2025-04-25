// src/converters/services/weight-converter.service.ts

import { Injectable } from '@angular/core';
import { IConverterService } from 'src/converters/interfaces/IConverterService';
import { CalculatorUnit } from 'src/converters/models/calculatorUnit';

@Injectable({
  providedIn: 'root'
})
export class WeightConverterService implements IConverterService {
  private units: CalculatorUnit[] = [
    { id: 'miligrama', name: 'Miligramas', symbol: 'mg', conversionFactor: 0.001 },
    { id: 'grama', name: 'Gramas', symbol: 'g', conversionFactor: 1 },
    { id: 'quilograma', name: 'Quilogramas', symbol: 'kg', conversionFactor: 1000 },
    { id: 'tonelada', name: 'Toneladas', symbol: 't', conversionFactor: 1000000 }
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

    // Converte para a unidade base (gramas) e depois para a unidade alvo
    const baseValue = value * sourceUnit.conversionFactor!;
    return baseValue / targetUnit.conversionFactor!;
  }
}