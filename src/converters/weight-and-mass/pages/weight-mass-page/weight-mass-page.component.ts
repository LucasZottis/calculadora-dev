import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { CalculatorUnit } from 'src/converters/shared/models/calculatorUnit';
import { WeightMassConverterService } from '../../services/weight-mass/weight-mass-converter.service';
import { PageBase } from 'src/shared/pages/pageBase';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavigationHelper } from 'src/shared/helpers/navigationHelper';

interface UnitGroup {
  name: string;
  units: CalculatorUnit[];
}

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
    public weightMassConverterService: WeightMassConverterService
  ) {
    super(meta, title);
  }

  ngOnInit() {
    // Obter todas as unidades disponíveis
    this.availableUnits = this.weightMassConverterService.getUnits();

    const description = 'Converta facilmente entre diferentes unidades de peso e massa como quilogramas, gramas, libras, onças e muito mais. Calculadora precisa com explicações detalhadas.';
    const pageTitle = 'Conversor de Peso e Massa - Todas as Unidades';

    this.setTitle(pageTitle);
    this.addDescription(description);

    // Atualizar metadados para SEO
    this.updateSeo({
      title: pageTitle,
      description: description,
      keywords: 'conversor de peso, conversor de massa, quilogramas para gramas, libras para quilos, onças, conversão de peso, calculadora de massa corporal, IMC'
    });

    // Adicionar Schema.org para rich snippets
    this.addSchemaOrgData('SoftwareApplication', {
      name: 'Conversor de Peso e Massa',
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
      'metric': ['micrograma', 'miligrama', 'centigrama', 'decigrama', 'grama', 'decagrama', 'hectograma', 'quilograma', 'tonelada-metrica'],
      'imperial': ['onca', 'libra', 'pedra', 'grao', 'tonelada-curta', 'tonelada-longa'],
      'other': ['quilates', 'quintal']
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
      },
      {
        name: 'Outras Unidades Especializadas',
        units: this.getUnitsBySystem('other')
      }
    ];
  }

  // Método para obter uma unidade pelo ID
  getUnitById(id: string): CalculatorUnit | undefined {
    return this.availableUnits.find(unit => unit.id === id);
  }
}