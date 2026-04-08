import { Optional } from '@angular/core';
import { UnitConverterFactory, IUnitConverter } from 'devtoolz-library';
import { ConverterUrlService } from '../converter-url-service/converter-url.service';

// @Injectable({
//   providedIn: 'root'
// })
export class ConvertersBaseService {
  protected converter: IUnitConverter;
  protected converterFactory: UnitConverterFactory = new UnitConverterFactory();

  constructor(
    protected categoryId: string,
    @Optional() protected urlService?: ConverterUrlService
  ) {
    this.converter = this.converterFactory.createService(categoryId);
  }

  getUnits() {
    return this.converter.getUnits();
  }

  getUnitById(unitId: string) {
    return this.converter.getUnitById(unitId);
  }

  convert(value: number, sourceUnitId: string, targetUnitId: string): number {
    return this.converter.convert(value, sourceUnitId, targetUnitId);
  }

  generateConversionUrl(sourceUnitId: string, targetUnitId: string): string {
    if (!this.urlService) return '';
    const sourceUnit = this.converter.getUnitById(sourceUnitId);
    const targetUnit = this.converter.getUnitById(targetUnitId);
    if (!sourceUnit || !targetUnit) return '';
    return this.urlService.generateConversionUrl(sourceUnit, targetUnit);
  }

  parseConversionUrl(url: string) {
    return this.urlService?.parseConversionUrl(this.converter.getUnits(), url);
  }
}
