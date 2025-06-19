import { TestBed } from '@angular/core/testing';

import { ConverterUrlService } from './converter-url.service';

describe('ConverterUrlService', () => {
  let service: ConverterUrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConverterUrlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
