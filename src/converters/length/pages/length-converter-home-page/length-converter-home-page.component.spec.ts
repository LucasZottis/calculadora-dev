import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LengthConverterHomePageComponent } from './length-converter-home-page.component';

describe('LengthConverterHomePageComponent', () => {
  let component: LengthConverterHomePageComponent;
  let fixture: ComponentFixture<LengthConverterHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LengthConverterHomePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LengthConverterHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
