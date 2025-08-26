import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataConverterPageComponent } from './data-converter-page.component';

describe('DataConverterPageComponent', () => {
  let component: DataConverterPageComponent;
  let fixture: ComponentFixture<DataConverterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataConverterPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataConverterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
