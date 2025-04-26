import { Injectable } from '@angular/core';
import { IConverterService } from 'src/converters/interfaces/IConverterService';
import { CalculatorUnit } from 'src/converters/models/calculatorUnit';

@Injectable({
  providedIn: 'root'
})
export class WeightMassConverterService implements IConverterService {
  private units: CalculatorUnit[] = [
    // Unidades métricas
    { id: 'quilates', name: 'Quilates', symbol: 'ct', conversionFactor: 0.2 },
    { id: 'micrograma', name: 'Micrograma', symbol: 'μg', conversionFactor: 0.000001 },
    { id: 'miligrama', name: 'Miligrama', symbol: 'mg', conversionFactor: 0.001 },
    { id: 'centigrama', name: 'Centigrama', symbol: 'cg', conversionFactor: 0.01 },
    { id: 'decigrama', name: 'Decigrama', symbol: 'dg', conversionFactor: 0.1 },
    { id: 'grama', name: 'Grama', symbol: 'g', conversionFactor: 1 },
    { id: 'decagrama', name: 'Decagrama', symbol: 'dag', conversionFactor: 10 },
    { id: 'hectograma', name: 'Hectograma', symbol: 'hg', conversionFactor: 100 },
    { id: 'quilograma', name: 'Quilograma', symbol: 'kg', conversionFactor: 1000 },
    { id: 'tonelada-metrica', name: 'Tonelada métrica', symbol: 't', conversionFactor: 1000000 },

    // Unidades imperiais/americanas
    { id: 'onca', name: 'Onça', symbol: 'oz', conversionFactor: 28.3495 },
    { id: 'libra', name: 'Libra', symbol: 'lb', conversionFactor: 453.592 },
    { id: 'pedra', name: 'Pedra', symbol: 'st', conversionFactor: 6350.29 },
    { id: 'tonelada-curta', name: 'Tonelada curta (EUA)', symbol: 'ton (EUA)', conversionFactor: 907185 },
    { id: 'tonelada-longa', name: 'Tonelada longa (Reino Unido)', symbol: 'ton (RU)', conversionFactor: 1016046 },
    { id: 'quintal', name: 'Quintal', symbol: 'cwt', conversionFactor: 50802.3 },
    { id: 'grao', name: 'Grão', symbol: 'gr', conversionFactor: 0.0647989 }
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

  // Método para formatar as unidades em formato de URL
  getUnitForUrl(unitId: string): string {
    const unit = this.getUnitById(unitId);
    if (!unit) return unitId;

    return unit.name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove acentos
      .replace(/[^\w\s-]/g, '') // Remove caracteres especiais
      .replace(/\s+/g, '-'); // Substitui espaços por hifens
  }

  // Método para obter o ID da unidade a partir da URL
  getUnitIdFromUrl(urlPart: string): string | undefined {
    // Primeiro tenta encontrar uma correspondência direta
    const directMatch = this.units.find(unit => this.getUnitForUrl(unit.id) === urlPart);
    if (directMatch) return directMatch.id;

    // Se não encontrar, tenta correspondências mais flexíveis
    for (const unit of this.units) {
      const unitUrlFormat = this.getUnitForUrl(unit.id);
      // Compara ignorando hifens, plurais etc.
      if (urlPart.includes(unitUrlFormat) || unitUrlFormat.includes(urlPart)) {
        return unit.id;
      }
    }

    return undefined;
  }

  // Método para auxiliar a converter entre a URL e os IDs das unidades
  parseConversionUrl(url: string): { sourceUnitId: string, targetUnitId: string } | undefined {
    // Formato esperado: unidade-origem-para-unidade-destino
    const parts = url.split('-para-');
    if (parts.length !== 2) return undefined;

    const sourceUnitId = this.getUnitIdFromUrl(parts[0]);
    const targetUnitId = this.getUnitIdFromUrl(parts[1]);

    if (!sourceUnitId || !targetUnitId) return undefined;

    return { sourceUnitId, targetUnitId };
  }

  // Método para auxiliar a gerar a URL a partir dos IDs das unidades
  generateConversionUrl(sourceUnitId: string, targetUnitId: string): string {
    const sourceUrlPart = this.getUnitForUrl(sourceUnitId);
    const targetUrlPart = this.getUnitForUrl(targetUnitId);

    return `${sourceUrlPart}-para-${targetUrlPart}`;
  }
}