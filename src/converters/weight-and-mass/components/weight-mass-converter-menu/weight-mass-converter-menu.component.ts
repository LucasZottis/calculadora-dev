import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { WeightMassConverterService } from '../../services/weight-mass/weight-mass-converter.service';

@Component({
  selector: 'weight-mass-converter-menu',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './weight-mass-converter-menu.component.html',
  styleUrl: './weight-mass-converter-menu.component.scss'
})
export class WeightMassConverterMenuComponent {
  @Input() tipoConversor: string = '';
  @Output() voltarParaConversores = new EventEmitter<void>();
  @Output() voltarParaMenuPrincipal = new EventEmitter<void>();
  @Output() toggleSidebar = new EventEmitter<void>();

  conversoes: Array<{ origem: string, destino: string, rotuloOrigem: string, rotuloDestino: string }> = [];
  conversoesFiltradas: Array<{ origem: string, destino: string, rotuloOrigem: string, rotuloDestino: string }> = [];
  termoBusca: string = '';

  constructor(private weightMassService: WeightMassConverterService) {
    this.gerarConversoesPopulares();
  }

  private gerarConversoesPopulares() {
    const unidades = this.weightMassService.getUnits();
    const unidadesPopulares = ['grama', 'quilograma', 'miligrama', 'tonelada-metrica', 'libra', 'onca'];

    // Gerar combinações de unidades populares
    for (const origem of unidadesPopulares) {
      for (const destino of unidadesPopulares) {
        if (origem !== destino) {
          const unidadeOrigem = this.weightMassService.getUnitById(origem);
          const unidadeDestino = this.weightMassService.getUnitById(destino);

          if (unidadeOrigem && unidadeDestino) {
            this.conversoes.push({
              origem: origem,
              destino: destino,
              rotuloOrigem: unidadeOrigem.name,
              rotuloDestino: unidadeDestino.name
            });
          }
        }
      }
    }

    // Adicionar algumas combinações extras mais específicas
    const combinacoesExtras = [
      { origem: 'micrograma', destino: 'miligrama' },
      { origem: 'quilograma', destino: 'tonelada-metrica' },
      { origem: 'quilograma', destino: 'libra' },
      { origem: 'grama', destino: 'onca' },
      { origem: 'libra', destino: 'quilograma' },
      { origem: 'onca', destino: 'grama' },
      { origem: 'quilates', destino: 'grama' },
      { origem: 'grao', destino: 'grama' },
      { origem: 'tonelada-metrica', destino: 'tonelada-curta' },
      { origem: 'tonelada-metrica', destino: 'tonelada-longa' }
    ];

    for (const combo of combinacoesExtras) {
      if (!this.conversoes.some(c => c.origem === combo.origem && c.destino === combo.destino)) {
        const unidadeOrigem = this.weightMassService.getUnitById(combo.origem);
        const unidadeDestino = this.weightMassService.getUnitById(combo.destino);

        if (unidadeOrigem && unidadeDestino) {
          this.conversoes.push({
            origem: combo.origem,
            destino: combo.destino,
            rotuloOrigem: unidadeOrigem.name,
            rotuloDestino: unidadeDestino.name
          });
        }
      }
    }

    this.conversoesFiltradas = [...this.conversoes];
  }

  gerarUrlConversao(origem: string, destino: string): string {
    return this.weightMassService.generateConversionUrl(origem, destino);
  }

  filtrarConversoes(evento: Event): void {
    const input = evento.target as HTMLInputElement;
    this.termoBusca = input.value.toLowerCase();

    if (!this.termoBusca) {
      this.conversoesFiltradas = [...this.conversoes];
      return;
    }

    this.conversoesFiltradas = this.conversoes.filter(
      c => c.rotuloOrigem.toLowerCase().includes(this.termoBusca) ||
        c.rotuloDestino.toLowerCase().includes(this.termoBusca)
    );
  }

  onVoltarParaConversores(): void {
    this.voltarParaConversores.emit();
  }

  onVoltarParaMenuPrincipal(): void {
    this.voltarParaMenuPrincipal.emit();
  }

  onToggleSidebar(): void {
    this.toggleSidebar.emit();
  }
}