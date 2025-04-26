import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { VolumeConverterMenuComponent } from 'src/converters/volume/components/volume-converter-menu/volume-converter-menu.component';
import { CookieConsentComponent } from 'src/shared/components/cookie-consent/cookie-consent.component';
import { filter } from 'rxjs';
import { WeightMassConverterMenuComponent } from 'src/converters/weight-and-mass/components/weight-mass-converter-menu/weight-mass-converter-menu.component';
import { MainMenuComponent } from 'src/shared/components/main-menu/main-menu.component';
import { ConvertersMenuComponent } from 'src/converters/shared/components/converters-menu/converters-menu.component';

@Component({
  selector: 'main-layout',
  standalone: true,
  imports: [
    RouterModule,
    RouterOutlet,
    CommonModule,
    CookieConsentComponent,
    MainMenuComponent,
    ConvertersMenuComponent,
    VolumeConverterMenuComponent,
    WeightMassConverterMenuComponent
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})

export class MainLayoutComponent {
  sidebarExpanded: boolean = false;
  sidebarStyle = 'sidebar';
  anoAtual: number = new Date().getFullYear();

  // Estados do menu
  menuAtual: 'principal' | 'conversores' | 'volume' | 'peso-massa' = 'principal';
  conversorSelecionado: string = '';

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    // Escuta mudanças na rota para atualizar o menu conforme necessário
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.atualizarMenuPorRota(event.url);
    });
  }

  atualizarMenuPorRota(url: string): void {
    // Verifica se a rota atual é de um conversor
    if (url.includes('/conversores/volume')) {
      this.conversorSelecionado = 'volume';
      this.menuAtual = 'volume';
    } else if (url.includes('/conversores')) {
      this.menuAtual = 'conversores';
    } else {
      this.menuAtual = 'principal';
    }
  }

  toggleSidebar(): void {
    this.sidebarExpanded = !this.sidebarExpanded;

    if (this.sidebarExpanded) {
      this.sidebarStyle = 'sidebar expanded';
    } else {
      this.sidebarStyle = 'sidebar';
    }
  }

  abrirMenuConversores(): void {
    this.menuAtual = 'conversores';
  }

  abrirMenuPrincipal(): void {
    this.menuAtual = 'principal';
  }

  abrirMenuConversor(tipo: string): void {
    this.conversorSelecionado = tipo;
    this.menuAtual = 'volume';
  }

  abrirConfigCookies(event: Event): void {
    event.preventDefault();

    // Dispara um evento personalizado para abrir o modal de cookies
    window.dispatchEvent(new CustomEvent('mostrar-cookie-dialog'));
  }
}