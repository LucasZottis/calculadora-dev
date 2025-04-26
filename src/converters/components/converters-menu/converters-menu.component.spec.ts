import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvertersMenuComponent } from './converters-menu.component';

describe('ConvertersMenuComponent', () => {
  let component: ConvertersMenuComponent;
  let fixture: ComponentFixture<ConvertersMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConvertersMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConvertersMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
