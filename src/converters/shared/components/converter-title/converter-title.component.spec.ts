import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConverterTitleComponent } from './converter-title.component';

describe('ConverterTitleComponent', () => {
  let component: ConverterTitleComponent;
  let fixture: ComponentFixture<ConverterTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConverterTitleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConverterTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
