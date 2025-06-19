import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeightMassPageComponent } from './weight-mass-page.component';

describe('WeightMassPageComponent', () => {
  let component: WeightMassPageComponent;
  let fixture: ComponentFixture<WeightMassPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeightMassPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WeightMassPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
