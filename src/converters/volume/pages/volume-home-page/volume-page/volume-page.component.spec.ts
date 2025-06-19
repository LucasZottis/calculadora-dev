import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolumePageComponent } from './volume-page.component';

describe('VolumePageComponent', () => {
  let component: VolumePageComponent;
  let fixture: ComponentFixture<VolumePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VolumePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VolumePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
