// src/services/menu/menu.service.ts
import { Injectable } from '@angular/core';

export interface MenuConversor {
  id: string;
  nome: string;
  icone: string;
  rotas: { nome: string, rota: string }[];
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private conversoresDisponiveis: MenuConversor[] = [
    {
      id: 'volume',
      nome: 'Conversor de Volume',
      icone: 'water_full',
      rotas: [
        { nome: 'Litros para Mililitros', rota: '/conversores/volume/litros-para-mililitros' },
        { nome: 'Mililitros para Litros', rota: '/conversores/volume/mililitros-para-litros' },
        { nome: 'Galão (EUA) para Litros', rota: '/conversores/volume/galao-eua-para-litros' },
        { nome: 'Xícara (EUA) para Mililitros', rota: '/conversores/volume/xicara-eua-para-mililitros' },
        { nome: 'Onça Fluída (EUA) para Mililitros', rota: '/conversores/volume/onca-fluida-eua-para-mililitros' },
        { nome: 'Litros para Metro Cúbico', rota: '/conversores/volume/litros-para-metro-cubico' }
      ]
    }
    // Aqui você pode adicionar mais conversores no futuro
  ];

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