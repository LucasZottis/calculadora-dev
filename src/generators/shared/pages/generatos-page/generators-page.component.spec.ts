import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GeneratorsPageComponent } from './generators-page.component';

describe('GeneratosPageComponent', () => {
  let component: GeneratorsPageComponent;
  let fixture: ComponentFixture<GeneratorsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneratorsPageComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GeneratorsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
