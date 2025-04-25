import { TestBed } from '@angular/core/testing';

import { LengthConverterService } from './length-converter.service';

describe('LengthConverterService', () => {
  let service: LengthConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LengthConverterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
