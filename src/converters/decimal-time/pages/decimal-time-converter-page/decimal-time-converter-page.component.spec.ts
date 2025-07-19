import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecimalTimeConverterPageComponent } from './decimal-time-converter-page.component';

describe('DecimalTimeConverterPageComponent', () => {
  let component: DecimalTimeConverterPageComponent;
  let fixture: ComponentFixture<DecimalTimeConverterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DecimalTimeConverterPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DecimalTimeConverterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
