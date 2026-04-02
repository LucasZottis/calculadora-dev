import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeedConverterPageComponent } from './speed-converter-page.component';

describe('SpeedConverterPageComponent', () => {
  let component: SpeedConverterPageComponent;
  let fixture: ComponentFixture<SpeedConverterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpeedConverterPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpeedConverterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
