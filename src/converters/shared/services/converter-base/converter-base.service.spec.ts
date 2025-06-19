import { TestBed } from '@angular/core/testing';

import { ConverterBaseService } from './converter-base.service';

describe('ConverterBaseService', () => {
  let service: ConverterBaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConverterBaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
