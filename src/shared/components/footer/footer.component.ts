import { Component } from '@angular/core';

@Component({
  selector: 'footer-layout',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  anoAtual: number = new Date().getFullYear();

  abrirConfigCookies(event: Event): void {
    event.preventDefault();
    window.dispatchEvent(new CustomEvent('mostrar-cookie-dialog'));
  }
}