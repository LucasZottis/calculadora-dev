import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CalculatorUnit } from 'src/converters/shared/models/calculatorUnit';
import { VolumeConverterService } from 'src/converters/volume/services/volume-converter/volume-converter.service';
import { NavigationHelper } from 'src/shared/helpers/navigationHelper';
import { PageBase } from 'src/shared/pages/pageBase';

// Interface para auxiliar no agrupamento de unidades
interface UnitGroup {
  name: string;
  units: CalculatorUnit[];
}

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
    public volumeConverterService: VolumeConverterService
  ) {
    super(meta, title);
  }

  ngOnInit() {
    // Obter todas as unidades disponíveis
    this.availableUnits = this.volumeConverterService.getUnits();

    const description = 'Converta facilmente entre diferentes unidades de volume como litros, mililitros, metros cúbicos, galões e muito mais. Calculadora precisa com explicações detalhadas.';
    const pageTitle = 'Conversor de Volume - Todas as Unidades';

    this.setTitle(pageTitle);
    this.addDescription(description);

    // Atualizar metadados para SEO
    this.updateSeo({
      title: pageTitle,
      description: description,
      keywords: 'conversor de volume, litros para mililitros, metros cúbicos, galões, onças fluídas, conversão de líquidos, calculadora de volume'
    });

    // Adicionar Schema.org para rich snippets
    this.addSchemaOrgData('SoftwareApplication', {
      name: 'Conversor de Volume',
      description: description,
      applicationCategory: 'UtilityApplication',
      operatingSystem: 'Web'
    });
  }

  ngAfterViewInit() {
    // Configurar navegação por âncoras na página
    NavigationHelper.setupAnchorNavigation();
    // Configurar exibição da navegação rápida durante rolagem
    NavigationHelper.setupScrollWatch(400);
  }

  // Método para ordenar as unidades por nome
  getSortedUnits(): CalculatorUnit[] {
    return [...this.availableUnits].sort((a, b) => a.name.localeCompare(b.name));
  }
  
  // Método para filtrar unidades por sistema
  getUnitsBySystem(system: string): CalculatorUnit[] {
    const systemMapping: Record<string, string[]> = {
      'metric': ['mililitros', 'centilitro', 'decilitro', 'litros', 'hectolitro', 'centimetro-cubico', 'decimetro-cubico', 'metro-cubico'],
      'imperial': ['onca-fluida-eua', 'onca-fluida-ru', 'galao-eua', 'xicara-eua', 'colher-cha-ru']
    };
    
    if (!systemMapping[system]) {
      return [];
    }
    
    return this.availableUnits.filter(unit => systemMapping[system].includes(unit.id));
  }
  
  // Método para agrupar unidades por tipo
  getUnitGroups(): UnitGroup[] {
    return [
      {
        name: 'Sistema Métrico',
        units: this.getUnitsBySystem('metric')
      },
      {
        name: 'Sistema Imperial/Americano',
        units: this.getUnitsBySystem('imperial')
      }
    ];
  }
  
  // Método para obter uma unidade pelo ID
  getUnitById(id: string): CalculatorUnit | undefined {
    return this.availableUnits.find(unit => unit.id === id);
  }
}