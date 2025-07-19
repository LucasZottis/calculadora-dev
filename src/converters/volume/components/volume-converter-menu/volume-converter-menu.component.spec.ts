import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolumeConverterMenuComponent } from './volume-converter-menu.component';

describe('VolumeConverterMenuComponent', () => {
  let component: VolumeConverterMenuComponent;
  let fixture: ComponentFixture<VolumeConverterMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VolumeConverterMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VolumeConverterMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
