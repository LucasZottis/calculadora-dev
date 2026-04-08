import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerConverterPageComponent } from './power-converter-page.component';

describe('PowerConverterPageComponent', () => {
  let component: PowerConverterPageComponent;
  let fixture: ComponentFixture<PowerConverterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PowerConverterPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PowerConverterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
