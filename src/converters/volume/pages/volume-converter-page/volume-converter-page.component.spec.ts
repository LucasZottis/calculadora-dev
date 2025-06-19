import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { VolumeConverterPageComponent } from './volume-converter-page.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';

describe('VolumeConverterPageComponent', () => {
  let component: VolumeConverterPageComponent;
  let fixture: ComponentFixture<VolumeConverterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        VolumeConverterPageComponent,
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

    fixture = TestBed.createComponent(VolumeConverterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default values', () => {
    expect(component.categoriaSelecionada).toBe('volume');
    expect(component.unidadeOrigemSelecionada).toBe('mililitros');
    expect(component.unidadeDestinoSelecionada).toBe('litros');
  });

  it('should update source unit', () => {
    component.onUnidadeOrigemChange('litros');
    expect(component.unidadeOrigemSelecionada).toBe('litros');
  });

  it('should update target unit', () => {
    component.onUnidadeDestinoChange('galao-eua');
    expect(component.unidadeDestinoSelecionada).toBe('galao-eua');
  });
});