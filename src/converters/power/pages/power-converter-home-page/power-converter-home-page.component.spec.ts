import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerConverterHomePageComponent } from './power-converter-home-page.component';

describe('PowerConverterHomePageComponent', () => {
  let component: PowerConverterHomePageComponent;
  let fixture: ComponentFixture<PowerConverterHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PowerConverterHomePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PowerConverterHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
