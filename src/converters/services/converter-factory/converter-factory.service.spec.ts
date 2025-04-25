import { TestBed } from '@angular/core/testing';

import { ConverterFactoryService } from './converter-factory.service';

describe('ConverterFactoryService', () => {
  let service: ConverterFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConverterFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
