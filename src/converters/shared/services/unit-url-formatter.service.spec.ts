import { TestBed } from '@angular/core/testing';

import { UnitUrlFormatterService } from './unit-url-formatter.service';

describe('UnitUrlFormatterService', () => {
  let service: UnitUrlFormatterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnitUrlFormatterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
