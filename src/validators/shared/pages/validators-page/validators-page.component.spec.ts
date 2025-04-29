import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidatorsPageComponent } from './validators-page.component';

describe('ValidatorsPageComponent', () => {
  let component: ValidatorsPageComponent;
  let fixture: ComponentFixture<ValidatorsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidatorsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ValidatorsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
