import { TestBed } from '@angular/core/testing';

import { WeightMassConverterService } from './weight-mass-converter.service';

describe('WeightMassConverterService', () => {
  let service: WeightMassConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeightMassConverterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should correctly convert from grams to kilograms', () => {
    const result = service.convert(1000, 'grama', 'quilograma');
    expect(result).toBe(1);
  });

  it('should correctly convert from kilograms to grams', () => {
    const result = service.convert(1, 'quilograma', 'grama');
    expect(result).toBe(1000);
  });

  it('should correctly convert from kilograms to pounds', () => {
    const result = service.convert(1, 'quilograma', 'libra');
    expect(result).toBeCloseTo(2.20462, 4);
  });

  it('should correctly parse conversion URL', () => {
    const result = service.parseConversionUrl('grama-para-quilograma');
    expect(result).toEqual({
      sourceUnitId: 'grama',
      targetUnitId: 'quilograma'
    });
  });

  it('should correctly generate conversion URL', () => {
    const result = service.generateConversionUrl('quilograma', 'grama');
    expect(result).toBe('quilograma-para-grama');
  });
});