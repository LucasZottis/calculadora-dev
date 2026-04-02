import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngleConverterPageComponent } from './angle-converter-page.component';

describe('AngleConverterPageComponent', () => {
  let component: AngleConverterPageComponent;
  let fixture: ComponentFixture<AngleConverterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngleConverterPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AngleConverterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
