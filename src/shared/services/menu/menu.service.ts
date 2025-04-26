// src/services/menu/menu.service.ts
import { Injectable } from '@angular/core';
import { VolumeConverterService } from 'src/converters/volume/services/volume-converter/volume-converter.service';
import { WeightMassConverterService } from 'src/converters/weight-and-mass/services/weight-mass/weight-mass-converter.service';
import { MenuConversor } from 'src/shared/models/menuConversor';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private conversoresDisponiveis: MenuConversor[] = [];

  constructor(
    private volumeConverterService: VolumeConverterService,
    private weightMassConverterService: WeightMassConverterService
  ) {
    // Inicializar conversores
    this.inicializarConversores();
  }

  private inicializarConversores(): void {
    // Gerar menu para conversor de volume
    this.registrarConversorVolume();

    // Gerar menu para conversor de peso e massa
    this.registrarConversorPesoMassa();
  }

  private registrarConversorVolume(): void {
    // Obter todas as unidades de volume
    const unidades = this.volumeConverterService.getUnits();
    const rotas: { nome: string, rota: string }[] = [];

    // Gerar todas as combinações possíveis de conversão
    for (const unidadeOrigem of unidades) {
      for (const unidadeDestino of unidades) {
        // Não incluir conversões para a mesma unidade
        if (unidadeOrigem.id !== unidadeDestino.id) {
          // Gerar URL amigável para a rota
          const urlRota = this.volumeConverterService.generateConversionUrl(
            unidadeOrigem.id,
            unidadeDestino.id
          );

          // Adicionar à lista de rotas
          rotas.push({
            nome: `${unidadeOrigem.name} para ${unidadeDestino.name}`,
            rota: `/conversores/volume/${urlRota}`
          });
        }
      }
    }

    // Registrar o conversor de volume com todas as rotas
    const conversorVolume: MenuConversor = {
      id: 'volume',
      nome: 'Conversor de Volume',
      icone: 'deployed_code',
      rotaLayout:'conversores/volume',
      rotas: rotas
    };

    this.conversoresDisponiveis.push(conversorVolume);
  }

  private registrarConversorPesoMassa(): void {
    // Obter todas as unidades de peso e massa
    const unidades = this.weightMassConverterService.getUnits();
    const rotas: { nome: string, rota: string }[] = [];

    // Gerar rotas para combinações populares de conversão
    const combinacoesPopulares = [
      { origem: 'grama', destino: 'quilograma' },
      { origem: 'quilograma', destino: 'grama' },
      { origem: 'miligrama', destino: 'grama' },
      { origem: 'quilograma', destino: 'libra' },
      { origem: 'libra', destino: 'quilograma' },
      { origem: 'grama', destino: 'onca' },
      { origem: 'onca', destino: 'grama' },
      { origem: 'quilograma', destino: 'tonelada-metrica' },
      { origem: 'tonelada-metrica', destino: 'quilograma' },
      { origem: 'miligrama', destino: 'micrograma' },
      { origem: 'quilates', destino: 'grama' },
      { origem: 'grama', destino: 'quilates' }
    ];

    for (const combo of combinacoesPopulares) {
      const unidadeOrigem = this.weightMassConverterService.getUnitById(combo.origem);
      const unidadeDestino = this.weightMassConverterService.getUnitById(combo.destino);

      if (unidadeOrigem && unidadeDestino) {
        // Gerar URL amigável para a rota
        const urlRota = this.weightMassConverterService.generateConversionUrl(
          combo.origem,
          combo.destino
        );

        // Adicionar à lista de rotas
        rotas.push({
          nome: `${unidadeOrigem.name} para ${unidadeDestino.name}`,
          rota: `/conversores/peso-massa/${urlRota}`
        });
      }
    }

    // Registrar o conversor de peso e massa com as rotas populares
    const conversorPesoMassa: MenuConversor = {
      id: 'peso-massa',
      nome: 'Conversor de Peso e Massa',
      icone: 'weight',
      rotaLayout: 'conversores/peso-e-massa',
      rotas: rotas
    };

    this.conversoresDisponiveis.push(conversorPesoMassa);
  }

  // Método público para acessar a lista de conversores disponíveis
  getConversoresDisponiveis(): MenuConversor[] {
    return this.conversoresDisponiveis;
  }

  getConversorPorId(id: string): MenuConversor | undefined {
    return this.conversoresDisponiveis.find(conversor => conversor.id === id);
  }

  // Método para registrar um novo conversor dinamicamente
  registrarConversor(conversor: MenuConversor): void {
    // Verifica se já existe um conversor com esse ID
    const index = this.conversoresDisponiveis.findIndex(c => c.id === conversor.id);

    if (index >= 0) {
      // Atualiza o conversor existente
      this.conversoresDisponiveis[index] = conversor;
    } else {
      // Adiciona um novo conversor
      this.conversoresDisponiveis.push(conversor);
    }
  }
}