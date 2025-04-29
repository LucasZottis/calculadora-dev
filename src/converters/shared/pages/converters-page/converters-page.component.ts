import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { PageBase } from 'src/shared/pages/pageBase';
import { ConverterCategory } from '../../models/converterCategory';
import { CalculatorCategory } from '../../models/calculatorCategory';
import { ConverterFactoryService } from '../../services/converter-factory/converter-factory.service';

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
  converterCategories: CalculatorCategory[] = [];

  constructor(
    meta: Meta,
    title: Title,
    private converterFactory: ConverterFactoryService
  ) {
    super(meta, title);
  }

  ngOnInit() {
    // Obter as categorias disponíveis do serviço de fábrica de conversores
    this.converterCategories = this.converterFactory.getCategories();

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
      itemListElement: this.converterCategories.map((category, index) => ({
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
