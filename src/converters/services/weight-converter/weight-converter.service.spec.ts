import { TestBed } from '@angular/core/testing';

import { WeightConverterService } from './weight-converter.service';

describe('WeightConverterService', () => {
  let service: WeightConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeightConverterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
