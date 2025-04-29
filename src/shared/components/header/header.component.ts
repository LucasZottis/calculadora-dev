// src/shared/components/header/header.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  searchQuery: string = '';

  onSearch(event: Event): void {
    event.preventDefault();
    if (this.searchQuery.trim()) {
      // Implementar lógica de busca futura
      console.log('Pesquisando por:', this.searchQuery);
    }
  }
}