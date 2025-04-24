import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CookieConfig, CookieService } from 'src/services/cookie/cookie.service';

@Component({
  selector: 'cookie-consent',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cookie-consent.component.html',
  styleUrl: './cookie-consent.component.scss'
})
export class CookieConsentComponent implements OnInit, OnDestroy {

  mostrarModal: boolean = false;
  mostrarConfiguracoes: boolean = false;
  cookieConfig: CookieConfig = {
    necessarios: true,
    analytics: false,
    marketing: false,
    personalizacao: false
  };

  constructor(private cookieService: CookieService) { }

  ngOnInit(): void {
    // Verifica se o usuário já aceitou os cookies
    const temConsentimento = this.cookieService.verificarConsentimento();

    if (!temConsentimento) {
      setTimeout(() => {
        this.mostrarModal = true;
      }, 1000); // Atrasa a exibição do modal para não atrapalhar o carregamento inicial
    } else {
      // Carrega as configurações salvas
      this.cookieConfig = this.cookieService.obterConfiguracoes();
    }

    // Adiciona listener para o evento personalizado
    window.addEventListener('mostrar-cookie-dialog', this.abrirModal.bind(this));
  }

  ngOnDestroy(): void {
    // Remove o listener ao destruir o componente
    window.removeEventListener('mostrar-cookie-dialog', this.abrirModal.bind(this));
  }

  abrirModal(): void {
    this.mostrarModal = true;
    this.mostrarConfiguracoes = true; // Já abre na tela de configurações
  }

  mostrarConfiguracoesAvancadas(): void {
    this.mostrarConfiguracoes = true;
  }

  aceitarTodos(): void {
    this.cookieConfig = {
      necessarios: true,
      analytics: true,
      marketing: true,
      personalizacao: true
    };
    this.salvarConfiguracoes();
  }

  aceitarSelecionados(): void {
    this.salvarConfiguracoes();
  }

  fecharModal(): void {
    this.mostrarModal = false;
    this.mostrarConfiguracoes = false; // Reset para o estado inicial quando fechar
  }

  resetarConfiguracoes(): void {
    this.cookieConfig = {
      necessarios: true,
      analytics: false,
      marketing: false,
      personalizacao: false
    };
  }

  salvarConfiguracoes(): void {
    this.cookieService.salvarConfiguracoes(this.cookieConfig);
    this.mostrarModal = false;
    this.mostrarConfiguracoes = false; // Reset para o estado inicial quando salvar
  }
}