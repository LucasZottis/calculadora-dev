import { Injectable } from '@angular/core';
import { IConverterService } from 'src/converters/shared/interfaces/IConverterService';
import { CalculatorUnit } from 'src/converters/shared/models/calculatorUnit';

@Injectable({
  providedIn: 'root'
})
export class VolumeConverterService implements IConverterService {
  private units: CalculatorUnit[] = [
    // Base: mililitros
    { id: 'mililitros', name: 'Mililitros', symbol: 'ml', conversionFactor: 1 },
    { id: 'litros', name: 'Litros', symbol: 'l', conversionFactor: 1000 },
    { id: 'hectolitro', name: 'Hectolitro', symbol: 'hl', conversionFactor: 100000 },
    { id: 'decilitro', name: 'Decilitro', symbol: 'dl', conversionFactor: 100 },
    { id: 'centilitro', name: 'Centilitro', symbol: 'cl', conversionFactor: 10 },
    { id: 'decimetro-cubico', name: 'Decímetro cúbico', symbol: 'dm³', conversionFactor: 1000 },
    { id: 'centimetro-cubico', name: 'Centímetro cúbico', symbol: 'cm³', conversionFactor: 1 },
    { id: 'metro-cubico', name: 'Metro cúbico', symbol: 'm³', conversionFactor: 1000000 },
    { id: 'onca-fluida-eua', name: 'Onça fluída (EUA)', symbol: 'fl oz (EUA)', conversionFactor: 29.5735 },
    { id: 'onca-fluida-ru', name: 'Onça fluída (Reino Unido)', symbol: 'fl oz (RU)', conversionFactor: 28.4131 },
    { id: 'xicara-eua', name: 'Xícara (EUA)', symbol: 'cup (EUA)', conversionFactor: 236.588 },
    { id: 'galao-eua', name: 'Galão (EUA)', symbol: 'gal (EUA)', conversionFactor: 3785.41 },
    { id: 'colher-cha-ru', name: 'Colher de chá (Reino Unido)', symbol: 'tsp (RU)', conversionFactor: 5.91939 }
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

    // Converte para a unidade base (mililitros) e depois para a unidade alvo
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