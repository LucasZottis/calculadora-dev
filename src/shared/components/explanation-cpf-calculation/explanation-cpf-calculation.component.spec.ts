import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplanationCpfCalculationComponent } from './explanation-cpf-calculation.component';

describe('ExplanationCpfCalculationComponent', () => {
  let component: ExplanationCpfCalculationComponent;
  let fixture: ComponentFixture<ExplanationCpfCalculationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExplanationCpfCalculationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExplanationCpfCalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
