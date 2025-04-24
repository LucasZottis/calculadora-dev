import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

// Declaração de interface para window que inclui Clarity
declare global {
  interface Window {
    clarity?: (command: string) => void;
  }
}

export interface CookieConfig {
  necessarios: boolean;
  analytics: boolean;
  marketing: boolean;
  personalizacao: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  private cookieConfigSubject = new BehaviorSubject<CookieConfig>({
    necessarios: true,
    analytics: false,
    marketing: false,
    personalizacao: false
  });

  cookieConfig$ = this.cookieConfigSubject.asObservable();

  constructor() {
    this.carregarConfiguracoes();
  }

  private carregarConfiguracoes(): void {
    const consentimento = localStorage.getItem('cookie-consent');

    if (consentimento) {
      try {
        const config = JSON.parse(consentimento);
        this.cookieConfigSubject.next(config);
        this.aplicarConfiguracoes(config);
      } catch (e) {
        console.error('Erro ao carregar configurações de cookies:', e);
      }
    }
  }

  salvarConfiguracoes(config: CookieConfig): void {
    localStorage.setItem('cookie-consent', JSON.stringify(config));
    this.cookieConfigSubject.next(config);
    this.aplicarConfiguracoes(config);
  }

  verificarConsentimento(): boolean {
    return localStorage.getItem('cookie-consent') !== null;
  }

  obterConfiguracoes(): CookieConfig {
    return this.cookieConfigSubject.value;
  }

  private aplicarConfiguracoes(config: CookieConfig): void {
    // Implementar a lógica para aplicar as configurações de cookies
    // Por exemplo: ativar/desativar scripts de analytics, marketing, etc.

    if (config.analytics) {
      this.ativarAnalytics();
    } else {
      this.desativarAnalytics();
    }

    if (config.marketing) {
      this.ativarMarketing();
    } else {
      this.desativarMarketing();
    }
  }

  private ativarAnalytics(): void {
    // Implementar a lógica para ativar scripts de analytics
    // Por exemplo: Google Analytics, Clarity, etc.
    console.log('Analytics ativado');

    // Exemplo para o Microsoft Clarity (já presente no projeto)
    if (window.clarity) {
      window.clarity('consent');
    }
  }

  private desativarAnalytics(): void {
    // Implementar a lógica para desativar scripts de analytics
    console.log('Analytics desativado');

    // Exemplo para o Microsoft Clarity
    if (window.clarity) {
      window.clarity('stop');
    }
  }

  private ativarMarketing(): void {
    // Implementar a lógica para ativar scripts de marketing
    // Por exemplo: Google Ads, Facebook Pixel, etc.
    console.log('Marketing ativado');
  }

  private desativarMarketing(): void {
    // Implementar a lógica para desativar scripts de marketing
    console.log('Marketing desativado');
  }
}