import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergyConverterPageComponent } from './energy-converter-page.component';

describe('EnergyConverterPageComponent', () => {
  let component: EnergyConverterPageComponent;
  let fixture: ComponentFixture<EnergyConverterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnergyConverterPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnergyConverterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
