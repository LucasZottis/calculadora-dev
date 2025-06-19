import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'volume-converter-menu',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './volume-converter-menu.component.html',
  styleUrl: './volume-converter-menu.component.scss'
})
export class VolumeConverterMenuComponent {
  @Input() tipoConversor: string = '';
  @Output() voltarParaConversores = new EventEmitter<void>();
  @Output() voltarParaMenuPrincipal = new EventEmitter<void>();
  @Output() toggleSidebar = new EventEmitter<void>();

  onVoltarParaConversores(): void {
    this.voltarParaConversores.emit();
  }

  onVoltarParaMenuPrincipal(): void {
    this.voltarParaMenuPrincipal.emit();
  }

  onToggleSidebar(): void {
    this.toggleSidebar.emit();
  }
}