import { Optional } from '@angular/core';
import { ConverterFactory, IConverter } from 'dev-toolz.library';
import { ConverterUrlService } from '../converter-url-service/converter-url.service';

// @Injectable({
//   providedIn: 'root'
// })
export class ConvertersBaseService {
  protected converter: IConverter;
  protected converterFactory: ConverterFactory = new ConverterFactory();

  constructor(
    protected categoryId: string,
    @Optional() protected urlService?: ConverterUrlService
  ) {
    this.converter = this.converterFactory.getConverter(categoryId);
    if (this.urlService) {
      this.urlService.units = this.converter.getUnits();
    }
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
    return this.urlService?.generateConversionUrl(sourceUnitId, targetUnitId) || '';
  }

  parseConversionUrl(url: string) {
    return this.urlService?.parseConversionUrl(url);
  }
}
