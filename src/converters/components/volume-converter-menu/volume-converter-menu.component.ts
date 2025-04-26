import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { VolumeConverterService } from 'src/converters/services/volume-converter/volume-converter.service';
import { MenuConversor } from 'src/layout/models/menuConversor';
import { MenuService } from 'src/layout/services/menu/menu.service';

@Component({
  selector: 'volume-converter-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './volume-converter-menu.component.html',
  styleUrl: './volume-converter-menu.component.scss'
})
export class VolumeConverterMenuComponent {
  @Input() tipoConversor: string = '';
  @Output() voltarParaConversores = new EventEmitter<void>();
  @Output() voltarParaMenuPrincipal = new EventEmitter<void>();
  @Output() toggleSidebar = new EventEmitter<void>();

  conversorAtivo: MenuConversor | undefined;
  opcoesConversao: { nome: string, rota: string }[] = [];

  constructor(private menuService: MenuService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tipoConversor']) {
      this.carregarConversor();
    }
  }

  carregarConversor(): void {
    this.conversorAtivo = this.menuService.getConversorPorId(this.tipoConversor);

    if (this.conversorAtivo) {
      this.opcoesConversao = this.conversorAtivo.rotas;
    } else {
      this.opcoesConversao = [];
    }
  }

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
