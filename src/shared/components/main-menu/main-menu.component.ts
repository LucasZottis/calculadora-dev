import { Component, EventEmitter, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'main-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.scss'
})
export class MainMenuComponent {
  @Output() abrirMenuConversores = new EventEmitter<void>();
  @Output() toggleSidebar = new EventEmitter<void>();

  onAbrirMenuConversores(): void {
    this.abrirMenuConversores.emit();
    this.toggleSidebar.emit();
  }

  onToggleSidebar(): void {
    this.toggleSidebar.emit();
  }
}