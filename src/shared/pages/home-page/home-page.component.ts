// src/shared/pages/home-page/home-page.component.ts
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { PageBase } from '../pageBase';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'home-page',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent extends PageBase implements OnInit {
  constructor(
    meta: Meta,
    title: Title
  ) {
    super(meta, title);
  }

  ngOnInit() {
    const description = 'Ferramentas e calculadoras online para validação e conversão de dados - suporte para CPF, CNPJ, e mais.';
    const pageTitle = 'Ferramentas e Calculadoras para Desenvolvedores';

    this.setTitle(pageTitle);
    this.addDescription(description);

    // Atualizar metadados para SEO
    this.updateSeo({
      title: pageTitle,
      description: description,
      keywords: 'calculadora dev, ferramentas para desenvolvedores, validador de CPF, validador de CNPJ, conversor de tempo, conversão de dados'
    });

    // Adicionar Schema.org para rich snippets
    this.addSchemaOrgData('WebSite', {
      name: 'Calculadora Dev',
      description: description,
      url: 'https://calculadora-dev.com.br'
    });
  }
}