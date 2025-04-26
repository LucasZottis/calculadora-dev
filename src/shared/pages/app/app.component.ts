import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app',
  standalone: true,
  imports: [RouterOutlet,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  anoAtual: number = new Date().getFullYear();

  abrirConfigCookies(event: Event): void {
    event.preventDefault();

    // Dispara um evento personalizado para abrir o modal de cookies
    window.dispatchEvent(new CustomEvent('mostrar-cookie-dialog'));
  }
}
