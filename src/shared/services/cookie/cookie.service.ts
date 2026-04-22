import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable, BehaviorSubject } from 'rxjs';

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

  private readonly _platformId = inject(PLATFORM_ID);

  private cookieConfigSubject = new BehaviorSubject<CookieConfig>({
    necessarios: true,
    analytics: false,
    marketing: false,
    personalizacao: false
  });

  cookieConfig$ = this.cookieConfigSubject.asObservable();

  constructor() {
    if (isPlatformBrowser(this._platformId)) {
      this.carregarConfiguracoes();
    }
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
    if (isPlatformBrowser(this._platformId)) {
      localStorage.setItem('cookie-consent', JSON.stringify(config));
    }
    this.cookieConfigSubject.next(config);
    this.aplicarConfiguracoes(config);
  }

  verificarConsentimento(): boolean {
    if (!isPlatformBrowser(this._platformId)) {
      return false;
    }
    return localStorage.getItem('cookie-consent') !== null;
  }

  obterConfiguracoes(): CookieConfig {
    return this.cookieConfigSubject.value;
  }

  private aplicarConfiguracoes(config: CookieConfig): void {
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
    console.log('Analytics ativado');

    if (isPlatformBrowser(this._platformId) && window.clarity) {
      window.clarity('consent');
    }
  }

  private desativarAnalytics(): void {
    console.log('Analytics desativado');

    if (isPlatformBrowser(this._platformId) && window.clarity) {
      window.clarity('stop');
    }
  }

  private ativarMarketing(): void {
    console.log('Marketing ativado');
  }

  private desativarMarketing(): void {
    console.log('Marketing desativado');
  }
}
