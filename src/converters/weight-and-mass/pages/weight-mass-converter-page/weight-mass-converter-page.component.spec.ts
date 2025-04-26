import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { WeightMassConverterPageComponent } from './weight-mass-converter-page.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';

describe('WeightMassConverterPageComponent', () => {
  let component: WeightMassConverterPageComponent;
  let fixture: ComponentFixture<WeightMassConverterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        WeightMassConverterPageComponent,
        RouterTestingModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({})
          }
        },
        Title,
        Meta
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(WeightMassConverterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default values', () => {
    expect(component.categoriaSelecionada).toBe('peso-massa');
    expect(component.unidadeOrigemSelecionada).toBe('grama');
    expect(component.unidadeDestinoSelecionada).toBe('quilograma');
  });

  it('should update source unit', () => {
    component.onUnidadeOrigemChange('quilograma');
    expect(component.unidadeOrigemSelecionada).toBe('quilograma');
  });

  it('should update target unit', () => {
    component.onUnidadeDestinoChange('libra');
    expect(component.unidadeDestinoSelecionada).toBe('libra');
  });

  it('should update formula when value changes', () => {
    // Simular mudança de valor
    component.onValorChange({
      sourceValue: '1000',
      targetValue: '1',
      sourceUnit: 'grama',
      targetUnit: 'quilograma'
    });

    expect(component.mostrarFormula).toBeTrue();
    expect(component.formulaDescricao).toContain('Para converter de');
    expect(component.formulaCalculo).toContain('1000');
  });
});