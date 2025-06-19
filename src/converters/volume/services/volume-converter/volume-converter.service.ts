// src/converters/volume/services/volume-converter/volume-converter.service.ts
import { Injectable } from '@angular/core';
import { ConverterFactory, VolumeConverter, Unit } from 'dev-toolz.library';
import { ConverterUrlService } from 'src/converters/shared/services/converter-url-service/converter-url.service';

@Injectable({
  providedIn: 'root'
})
export class VolumeConverterService {
  private converter: VolumeConverter;

  constructor(
    private converterFactory: ConverterFactory,
    private urlService: ConverterUrlService
  ) {
    this.converter = this.converterFactory.getConverter('volume') as VolumeConverter;
  }

  // Métodos de conversão
  convert(value: number, sourceUnitId: string, targetUnitId: string): number {
    return this.converter.convert(value, sourceUnitId, targetUnitId);
  }

  getUnits(): Unit[] {
    return this.converter.getUnits();
  }

  getUnitById(unitId: string): Unit | undefined {
    return this.converter.getUnitById(unitId);
  }

  // Métodos de URL
  generateConversionUrl(sourceUnitId: string, targetUnitId: string): string {
    const sourceUnit = this.getUnitById(sourceUnitId);
    const targetUnit = this.getUnitById(targetUnitId);

    if (!sourceUnit || !targetUnit) {
      throw new Error('Unidades inválidas para geração de URL');
    }

    return this.urlService.generateConversionUrl(sourceUnit, targetUnit);
  }

  parseConversionUrl(url: string): { sourceUnitId: string, targetUnitId: string } | undefined {
    const units = this.getUnits();
    const result = this.urlService.parseConversionUrl(units, url);

    if (!result) return undefined;

    return {
      sourceUnitId: result.sourceUnit.id,
      targetUnitId: result.targetUnit.id
    };
  }
}