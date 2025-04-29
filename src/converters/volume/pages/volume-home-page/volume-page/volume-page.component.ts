import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CalculatorUnit } from 'src/converters/shared/models/calculatorUnit';
import { VolumeConverterService } from 'src/converters/volume/services/volume-converter/volume-converter.service';
import { PageBase } from 'src/shared/pages/pageBase';

@Component({
  selector: 'volume-page',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule
  ],
  templateUrl: './volume-page.component.html',
  styleUrl: './volume-page.component.scss'
})
export class VolumePageComponent extends PageBase implements OnInit {
  availableUnits: CalculatorUnit[] = [];

  constructor(
    meta: Meta,
    title: Title,
    public volumeConverterService: VolumeConverterService  // Tornar público para uso no template
  ) {
    super(meta, title);
  }

  ngOnInit() {
    // Obter todas as unidades disponíveis
    this.availableUnits = this.volumeConverterService.getUnits();

    const description = 'Converta facilmente entre diferentes unidades de volume: litros, mililitros, metros cúbicos, galões e muito mais.';
    const pageTitle = 'Conversor de Volume';

    this.setTitle(pageTitle);
    this.addDescription(description);

    // Atualizar metadados para SEO
    this.updateSeo({
      title: pageTitle,
      description: description,
      keywords: 'conversor de volume, litros para mililitros, metros cúbicos, galões, onças fluídas, conversão de líquidos'
    });

    // Adicionar Schema.org para rich snippets
    this.addSchemaOrgData('SoftwareApplication', {
      name: 'Conversor de Volume',
      description: description,
      applicationCategory: 'UtilityApplication',
      operatingSystem: 'Web'
    });
  }
}