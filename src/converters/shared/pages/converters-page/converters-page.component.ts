import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { PageBase } from 'src/shared/pages/pageBase';

@Component({
  selector: 'converters-page',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule
  ],
  templateUrl: './converters-page.component.html',
  styleUrl: './converters-page.component.scss'
})
export class ConvertersPageComponent extends PageBase implements OnInit {
  categories: Array<{ id: string, name: string, icon: string }> = [
    { id: 'angulo', name: 'Ângulo', icon: '360' },
    { id: 'csv-json', name: 'CSV/JSON', icon: 'data_object' },
    { id: 'area', name: 'Área', icon: 'square_foot' },
    { id: 'comprimento', name: 'Comprimento', icon: 'straighten' },
    { id: 'dados', name: 'Dados', icon: 'database' },
    { id: 'energia', name: 'Energia', icon: 'bolt' },
    { id: 'peso-e-massa', name: 'Peso e Massa', icon: 'weight' },
    { id: 'pressao', name: 'Pressão', icon: 'compress' },
    { id: 'sistemas-numericos', name: 'Sistemas Numéricos', icon: 'tag' },
    { id: 'temperatura', name: 'Temperatura', icon: 'device_thermostat' },
    { id: 'tempo-decimal', name: 'Tempo Decimal', icon: 'speed_1_75' },
    { id: 'texto', name: 'Conversor de Texto', icon: 'text_fields' },
    { id: 'velocidade', name: 'Velocidade', icon: 'speed' },
    { id: 'volume', name: 'Volume', icon: 'deployed_code' },
  ];

  constructor() {
    super();
  }

  ngOnInit() {
    const description = 'Ferramentas para converter entre diferentes unidades de medida como volume, peso, massa e tempo. Conversões rápidas e precisas.';
    const pageTitle = 'Conversores de Unidades';

    this.setTitle(pageTitle);
    this.addDescription(description);

    // Atualizar metadados para SEO
    this.updateSeo({
      title: pageTitle,
      description: description,
      keywords: 'conversor unidades, conversor volume, conversor peso, conversor massa, conversor tempo, conversão medidas'
    });

    // Adicionar Schema.org para rich snippets
    this.addSchemaOrgData('ItemList', {
      name: 'Conversores de Unidades',
      description: description,
      itemListElement: this.categories.map((category, index) => ({
        '@type': 'ListItem',
        'position': index + 1,
        'item': {
          '@type': 'SoftwareApplication',
          'name': category.name,
          'description': category.id,
          'applicationCategory': 'UtilityApplication'
        }
      }))
    });
  }

  // Método para gerar rota para cada categoria
  getCategoryRoute(categoryId: string): string {
    return `/conversores/${categoryId}`;
  }
}
