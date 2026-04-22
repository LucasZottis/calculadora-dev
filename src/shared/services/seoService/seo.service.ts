// src/shared/services/seo/seo.service.ts
import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private readonly _document = inject(DOCUMENT);

  constructor(
    private meta: Meta,
    private title: Title
  ) { }

  /**
   * Atualiza as tags meta para SEO
   * @param config Configuração das tags meta
   */
  updateTags(config: {
    title?: string;
    description?: string;
    keywords?: string;
  }) {
    const siteName = 'Calculadora Dev';

    // Título da página
    if (config.title) {
      const fullTitle = `${config.title} - ${siteName}`;
      this.title.setTitle(fullTitle);
    }

    // Descrição
    if (config.description) {
      this.meta.updateTag({ name: 'description', content: config.description });
    }

    // Palavras-chave
    if (config.keywords) {
      this.meta.updateTag({ name: 'keywords', content: config.keywords });
    }

    // Robots
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
  }

  /**
   * Cria ou atualiza a tag <link rel="canonical"> com a URL informada.
   * @param path Caminho relativo da página (ex: /conversores/tempo/converter-hora-para-dia)
   */
  updateCanonical(path: string): void {
    const url = this._document.location.origin + path;
    let link: HTMLLinkElement | null = this._document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = this._document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this._document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  /**
   * Adiciona estrutura de dados schema.org para rich snippets
   * @param type Tipo de schema
   * @param data Dados do schema
   */
  addSchema(type: string, data: any) {
    const script = this._document.createElement('script');
    script.type = 'application/ld+json';

    const schema = {
      '@context': 'https://schema.org',
      '@type': type,
      ...data
    };

    script.text = JSON.stringify(schema);
    this._document.head.appendChild(script);
  }
}