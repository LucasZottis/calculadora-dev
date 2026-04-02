import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngleConverterHomePageComponent } from './angle-converter-home-page.component';

describe('AngleConverterHomePageComponent', () => {
  let component: AngleConverterHomePageComponent;
  let fixture: ComponentFixture<AngleConverterHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngleConverterHomePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AngleConverterHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
