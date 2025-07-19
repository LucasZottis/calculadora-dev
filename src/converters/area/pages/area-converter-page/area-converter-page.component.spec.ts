import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaConverterPageComponent } from './area-converter-page.component';

describe('AreaConverterPageComponent', () => {
  let component: AreaConverterPageComponent;
  let fixture: ComponentFixture<AreaConverterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AreaConverterPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AreaConverterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
