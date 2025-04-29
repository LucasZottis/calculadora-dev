// src/generators/shared/pages/generators-page/generators-page.component.ts
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { PageBase } from 'src/shared/pages/pageBase';
import { CommonModule } from '@angular/common';
import { GeneratorTool } from '../../models/generatorTool';

@Component({
  selector: 'generators-page',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule
  ],
  templateUrl: './generators-page.component.html',
  styleUrl: './generators-page.component.scss'
})
export class GeneratorsPageComponent extends PageBase implements OnInit {
  generators: GeneratorTool[] = [
    {
      id: 'cpf',
      name: 'Gerador de CPF',
      description: 'Gere números de CPF válidos para testes de software e desenvolvimento',
      icon: 'person_add',
      route: '/geradores/cpf'
    },
    {
      id: 'cnpj',
      name: 'Gerador de CNPJ',
      description: 'Gere números de CNPJ válidos para ambiente de teste e homologação',
      icon: 'business',
      route: '/geradores/cnpj'
    }
    // Mais geradores podem ser adicionados aqui no futuro
  ];

  constructor(
    meta: Meta,
    title: Title
  ) {
    super(meta, title);
  }

  ngOnInit() {
    const description = 'Ferramentas para gerar CPF, CNPJ e outros documentos válidos para uso em ambiente de testes e desenvolvimento.';
    const pageTitle = 'Geradores de Documentos para Testes';

    this.setTitle(pageTitle);
    this.addDescription(description);

    // Atualizar metadados para SEO
    this.updateSeo({
      title: pageTitle,
      description: description,
      keywords: 'gerador CPF, gerador CNPJ, gerador de documentos, gerar CPF válido, gerar CNPJ válido, teste de software'
    });

    // Adicionar Schema.org para rich snippets
    this.addSchemaOrgData('ItemList', {
      name: 'Geradores de Documentos para Testes',
      description: description,
      itemListElement: this.generators.map((generator, index) => ({
        '@type': 'ListItem',
        'position': index + 1,
        'item': {
          '@type': 'SoftwareApplication',
          'name': generator.name,
          'description': generator.description,
          'applicationCategory': 'DeveloperApplication'
        }
      }))
    });
  }
}