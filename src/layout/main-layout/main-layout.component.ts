import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CookieConsentComponent } from 'src/shared/cookie-consent/cookie-consent.component';

@Component({
  selector: 'main-layout',
  standalone: true,
  imports: [
    RouterModule,
    RouterOutlet,
    CommonModule,
    CookieConsentComponent
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})

export class MainLayoutComponent {
  sidebarExpanded: boolean = false;
  sidebarStyle = 'sidebar';
  anoAtual: number = new Date().getFullYear();

  toggleSidebar(): void {
    this.sidebarExpanded = !this.sidebarExpanded;

    if (this.sidebarExpanded) {
      this.sidebarStyle = 'sidebar expanded';
    } else {
      this.sidebarStyle = 'sidebar';
    }
  }

  abrirConfigCookies(event: Event): void {
    event.preventDefault();

    // Dispara um evento personalizado para abrir o modal de cookies
    window.dispatchEvent(new CustomEvent('mostrar-cookie-dialog'));
  }
}