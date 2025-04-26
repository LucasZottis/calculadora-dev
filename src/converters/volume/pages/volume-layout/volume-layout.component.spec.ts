import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolumeLayoutComponent } from './volume-layout.component';

describe('VolumeLayoutComponent', () => {
  let component: VolumeLayoutComponent;
  let fixture: ComponentFixture<VolumeLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VolumeLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VolumeLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
