import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergyHomePageComponent } from './energy-home-page.component';

describe('EnergyHomePageComponent', () => {
  let component: EnergyHomePageComponent;
  let fixture: ComponentFixture<EnergyHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnergyHomePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnergyHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
