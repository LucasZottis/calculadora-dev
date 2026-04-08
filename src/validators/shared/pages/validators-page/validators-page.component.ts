import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { PageBase } from "src/shared/pages/pageBase";
import { ValidatorTool } from "../../models/validatorTool";
import { BreadcrumbItem } from "src/shared/models/breadcrumb-item";

import { BreadcrumbsComponent } from 'src/shared/components/breadcrumbs/breadcrumbs.component';
@Component({
  selector: 'validators-page',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    BreadcrumbsComponent
  ],

  templateUrl: './validators-page.component.html',
  styleUrl: './validators-page.component.scss'
})
export class ValidatorsPageComponent extends PageBase implements OnInit {
  readonly breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Início', link: '/' },
    { label: 'Validadores' },
  ];

  validators: ValidatorTool[] = [
    {
      id: 'cpf',
      name: 'Validador de CPF',
      description: 'Verifique se um número de CPF é válido e aprenda como calcular os dígitos verificadores',
      icon: 'person_check',
      route: '/validadores/cpf'
    },
    {
      id: 'cnpj',
      name: 'Validador de CNPJ',
      description: 'Verifique se um número de CNPJ é válido e aprenda como calcular os dígitos verificadores',
      icon: 'fact_check',
      route: '/validadores/cnpj'
    }
    // Mais validadores podem ser adicionados aqui no futuro
  ];

  ngOnInit() {
    const description = 'Ferramentas de validação para CPF, CNPJ e outros documentos brasileiros. Valide dados com precisão e facilidade.';
    const pageTitle = 'Validadores de Documentos Brasileiros';

    this.setTitle(pageTitle);
    this.addDescription(description);

    // Atualizar metadados para SEO
    this.updateSeo({
      title: pageTitle,
      description: description,
      keywords: 'validador CPF, validador CNPJ, verificar CPF, verificar CNPJ, validação documentos brasileiros'
    });

    // Adicionar Schema.org para rich snippets
    this.addSchemaOrgData('ItemList', {
      name: 'Validadores de Documentos Brasileiros',
      description: description,
      itemListElement: this.validators.map((validator, index) => ({
        '@type': 'ListItem',
        'position': index + 1,
        'item': {
          '@type': 'SoftwareApplication',
          'name': validator.name,
          'description': validator.description,
          'applicationCategory': 'DeveloperApplication'
        }
      }))
    });
  }
}
