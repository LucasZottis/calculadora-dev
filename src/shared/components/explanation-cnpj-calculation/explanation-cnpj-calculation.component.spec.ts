import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplanationCnpjCalculationComponent } from './explanation-cnpj-calculation.component';

describe('ExplanationCnpjCalculationComponent', () => {
  let component: ExplanationCnpjCalculationComponent;
  let fixture: ComponentFixture<ExplanationCnpjCalculationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExplanationCnpjCalculationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExplanationCnpjCalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
