// src/shared/services/seo/seo.service.ts
import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
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
   * Adiciona estrutura de dados schema.org para rich snippets
   * @param type Tipo de schema
   * @param data Dados do schema
   */
  addSchema(type: string, data: any) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';

    const schema = {
      '@context': 'https://schema.org',
      '@type': type,
      ...data
    };

    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
  }
}