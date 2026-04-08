import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeedConverterHomePageComponent } from './speed-converter-home-page.component';

describe('SpeedConverterHomePageComponent', () => {
  let component: SpeedConverterHomePageComponent;
  let fixture: ComponentFixture<SpeedConverterHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpeedConverterHomePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpeedConverterHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
