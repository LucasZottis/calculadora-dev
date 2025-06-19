import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvertersPageComponent } from './converters-page.component';

describe('ConvertersPageComponent', () => {
  let component: ConvertersPageComponent;
  let fixture: ComponentFixture<ConvertersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConvertersPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConvertersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
