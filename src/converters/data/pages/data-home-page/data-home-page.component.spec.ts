import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataHomePageComponent } from './data-home-page.component';

describe('DataHomePageComponent', () => {
  let component: DataHomePageComponent;
  let fixture: ComponentFixture<DataHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataHomePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
