import { Injectable } from '@angular/core';
import { IUnitConverter, Unit } from 'devtoolz-library';

const TIME_UNITS: Unit[] = [
  { id: 'ano',           name: 'Ano',           symbol: 'a',   conversionFactor: 31536000,  isBaseUnit: false },
  { id: 'semana',        name: 'Semana',        symbol: 'sem', conversionFactor: 604800,    isBaseUnit: false },
  { id: 'dia',           name: 'Dia',           symbol: 'd',   conversionFactor: 86400,     isBaseUnit: false },
  { id: 'hora',          name: 'Hora',          symbol: 'h',   conversionFactor: 3600,      isBaseUnit: false },
  { id: 'minuto',        name: 'Minuto',        symbol: 'min', conversionFactor: 60,        isBaseUnit: false },
  { id: 'segundo',       name: 'Segundo',       symbol: 's',   conversionFactor: 1,         isBaseUnit: true  },
  { id: 'milissegundo',  name: 'Milissegundo',  symbol: 'ms',  conversionFactor: 0.001,     isBaseUnit: false },
  { id: 'microssegundo', name: 'Microssegundo', symbol: 'µs',  conversionFactor: 0.000001,  isBaseUnit: false },
  { id: 'picossegundo',  name: 'Picossegundo',  symbol: 'ps',  conversionFactor: 1e-12,     isBaseUnit: false },
];

@Injectable({
  providedIn: 'root'
})
export class TimeConverterService implements IUnitConverter {
  private readonly _units: Unit[] = TIME_UNITS;
  private readonly _byId = new Map<string, Unit>(this._units.map(u => [u.id, u]));
  private readonly _bySymbol = new Map<string, Unit>(this._units.map(u => [u.symbol, u]));
  private readonly _byName = new Map<string, Unit>(this._units.map(u => [u.name, u]));

  convert(value: number, fromUnitId: string, toUnitId: string): number {
    const source = this.getUnitById(fromUnitId);
    const target = this.getUnitById(toUnitId);
    if (!source || !target) throw new Error('Unidade não encontrada');
    // Convert to base (seconds), then to target
    const baseValue = value * source.conversionFactor;
    return baseValue / target.conversionFactor;
  }

  getUnits(): Unit[] { return this._units; }

  getBaseUnit(): Unit { return this._units.find(u => u.isBaseUnit)!; }

  getUnitById(id: string): Unit | undefined { return this._byId.get(id); }

  getUnitBySymbol(symbol: string): Unit | undefined { return this._bySymbol.get(symbol); }

  getUnitByName(name: string): Unit | undefined { return this._byName.get(name); }
}
