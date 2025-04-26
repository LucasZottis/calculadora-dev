import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { PageBase } from 'src/shared/pages/pageBase';

@Component({
  selector: 'volume-home-page',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './volume-home-page.component.html',
  styleUrl: './volume-home-page.component.scss'
})
export class VolumeHomePageComponent extends PageBase implements OnInit {
  popularConversions = [
    { name: 'Litros para Mililitros', url: 'litros-para-mililitros' },
    { name: 'Mililitros para Litros', url: 'mililitros-para-litros' },
    { name: 'Galão (EUA) para Litros', url: 'galao-eua-para-litros' },
    { name: 'Litros para Galão (EUA)', url: 'litros-para-galao-eua' },
    { name: 'Mililitros para Onça Fluida', url: 'mililitros-para-onca-fluida-eua' }
  ];

  constructor(meta: Meta, title: Title) {
    super(meta, title);
  }

  ngOnInit() {
    this.setTitle('Conversor de Volume');
    this.addDescription('Ferramenta para conversão entre diferentes unidades de volume como mililitros, litros, galões, xícaras e outras medidas. Conversões precisas e rápidas.');
  }
}
