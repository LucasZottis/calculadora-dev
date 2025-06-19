import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemperatureConverterHomePageComponent } from './temperature-converter-home-page.component';

describe('TemperatureConverterHomePageComponent', () => {
  let component: TemperatureConverterHomePageComponent;
  let fixture: ComponentFixture<TemperatureConverterHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemperatureConverterHomePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TemperatureConverterHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
