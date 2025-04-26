import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VolumeConverterMenuComponent } from '../../components/volume-converter-menu/volume-converter-menu.component';
import { CookieConsentComponent } from 'src/shared/components/cookie-consent/cookie-consent.component';

@Component({
  selector: 'volume-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, VolumeConverterMenuComponent, CookieConsentComponent],
  templateUrl: './volume-layout.component.html',
  styleUrl: './volume-layout.component.scss'
})
export class VolumeLayoutComponent {
  sidebarExpanded: boolean = false;
  sidebarStyle = 'sidebar';
  anoAtual: number = new Date().getFullYear();

  toggleSidebar(): void {
    this.sidebarExpanded = !this.sidebarExpanded;
    this.sidebarStyle = this.sidebarExpanded ? 'sidebar expanded' : 'sidebar';
  }

  abrirConfigCookies(event: Event): void {
    event.preventDefault();
    window.dispatchEvent(new CustomEvent('mostrar-cookie-dialog'));
  }
}
