import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { CalculatorUnit } from 'src/converters/shared/models/calculatorUnit';
import { WeightMassConverterService } from '../../services/weight-mass/weight-mass-converter.service';
import { PageBase } from 'src/shared/pages/pageBase';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'weight-mass-page',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule
  ],
  templateUrl: './weight-mass-page.component.html',
  styleUrl: './weight-mass-page.component.scss'
})
export class WeightMassPageComponent extends PageBase implements OnInit {
  availableUnits: CalculatorUnit[] = [];

  constructor(
    meta: Meta,
    title: Title,
    public weightMassConverterService: WeightMassConverterService  // Tornar público para uso no template
  ) {
    super(meta, title);
  }

  ngOnInit() {
    // Obter todas as unidades disponíveis
    this.availableUnits = this.weightMassConverterService.getUnits();

    const description = 'Converta facilmente entre diferentes unidades de peso e massa: quilogramas, gramas, libras, onças e muito mais.';
    const pageTitle = 'Conversor de Peso e Massa';

    this.setTitle(pageTitle);
    this.addDescription(description);

    // Atualizar metadados para SEO
    this.updateSeo({
      title: pageTitle,
      description: description,
      keywords: 'conversor de peso, conversor de massa, quilogramas para gramas, libras para quilos, onças, conversão de peso'
    });

    // Adicionar Schema.org para rich snippets
    this.addSchemaOrgData('SoftwareApplication', {
      name: 'Conversor de Peso e Massa',
      description: description,
      applicationCategory: 'UtilityApplication',
      operatingSystem: 'Web'
    });
  }
}