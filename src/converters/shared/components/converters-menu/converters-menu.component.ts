import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuConversor } from 'src/shared/models/menuConversor';
import { MenuService } from 'src/shared/services/menu/menu.service';

@Component({
  selector: 'converters-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './converters-menu.component.html',
  styleUrl: './converters-menu.component.scss'
})
export class ConvertersMenuComponent {
  @Output() voltarParaMenuPrincipal = new EventEmitter<void>();
  @Output() abrirMenuConversor = new EventEmitter<string>();
  @Output() toggleSidebar = new EventEmitter<void>();

  conversoresDisponiveis: MenuConversor[] = [];

  constructor(private menuService: MenuService) {
    this.conversoresDisponiveis = this.menuService.getConversoresDisponiveis();
  }

  onVoltarParaMenuPrincipal(): void {
    this.voltarParaMenuPrincipal.emit();
  }

  onAbrirMenuConversor(tipo: string): void {
    this.abrirMenuConversor.emit(tipo);
    this.toggleSidebar.emit();
  }
}