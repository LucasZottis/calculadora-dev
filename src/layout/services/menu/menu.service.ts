// src/services/menu/menu.service.ts
import { Injectable } from '@angular/core';
import { VolumeConverterService } from 'src/converters/services/volume-converter/volume-converter.service';
import { MenuConversor } from 'src/layout/models/menuConversor';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private conversoresDisponiveis: MenuConversor[] = [];

  constructor(private volumeConverterService: VolumeConverterService) {
    // Inicializar conversores
    this.inicializarConversores();
  }

  private inicializarConversores(): void {
    // Gerar menu para conversor de volume
    this.registrarConversorVolume();
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
      rotas: rotas
    };

    this.conversoresDisponiveis.push(conversorVolume);
  }

  // Diretamente lendo o serviço
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