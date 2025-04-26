import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { WeightMassConverterMenuComponent } from './weight-mass-converter-menu.component';

describe('WeightMassConverterMenuComponent', () => {
  let component: WeightMassConverterMenuComponent;
  let fixture: ComponentFixture<WeightMassConverterMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeightMassConverterMenuComponent, RouterTestingModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(WeightMassConverterMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have popular conversions', () => {
    expect(component.conversoes.length).toBeGreaterThan(0);
  });

  it('should filter conversions correctly', () => {
    // Simular evento de entrada com valor 'grama'
    const mockEvent = { target: { value: 'grama' } } as unknown as Event;
    component.filtrarConversoes(mockEvent);

    // Verificar se todas as conversões filtradas contêm 'grama'
    expect(component.conversoesFiltradas.length).toBeGreaterThan(0);
    component.conversoesFiltradas.forEach(conv => {
      expect(
        conv.rotuloOrigem.toLowerCase().includes('grama') ||
        conv.rotuloDestino.toLowerCase().includes('grama')
      ).toBeTrue();
    });
  });

  it('should emit events when buttons are clicked', () => {
    spyOn(component.voltarParaConversores, 'emit');
    spyOn(component.voltarParaMenuPrincipal, 'emit');
    spyOn(component.toggleSidebar, 'emit');

    component.onVoltarParaConversores();
    expect(component.voltarParaConversores.emit).toHaveBeenCalled();

    component.onVoltarParaMenuPrincipal();
    expect(component.voltarParaMenuPrincipal.emit).toHaveBeenCalled();

    component.onToggleSidebar();
    expect(component.toggleSidebar.emit).toHaveBeenCalled();
  });
});