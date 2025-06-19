import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemperatureConverterPageComponent } from './temperature-converter-page.component';

describe('TemperatureConverterPageComponent', () => {
  let component: TemperatureConverterPageComponent;
  let fixture: ComponentFixture<TemperatureConverterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemperatureConverterPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TemperatureConverterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
