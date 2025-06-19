import { TestBed } from '@angular/core/testing';

import { VolumeConverterService } from './volume-converter.service';

describe('VolumeConverterService', () => {
  let service: VolumeConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VolumeConverterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should correctly convert from liters to milliliters', () => {
    const result = service.convert(1, 'litros', 'mililitros');
    expect(result).toBe(1000);
  });

  it('should correctly convert from milliliters to liters', () => {
    const result = service.convert(1000, 'mililitros', 'litros');
    expect(result).toBe(1);
  });

  it('should correctly parse conversion URL', () => {
    const result = service.parseConversionUrl('litros-para-mililitros');
    expect(result).toEqual({
      sourceUnitId: 'litros',
      targetUnitId: 'mililitros'
    });
  });

  it('should correctly generate conversion URL', () => {
    const result = service.generateConversionUrl('litros', 'mililitros');
    expect(result).toBe('litros-para-mililitros');
  });
});