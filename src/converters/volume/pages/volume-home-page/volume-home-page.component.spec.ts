import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolumeHomePageComponent } from './volume-home-page.component';

describe('VolumeHomePageComponent', () => {
  let component: VolumeHomePageComponent;
  let fixture: ComponentFixture<VolumeHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VolumeHomePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VolumeHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
