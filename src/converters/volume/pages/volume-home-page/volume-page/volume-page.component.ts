import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ConverterFactory, IUnitConverter, Unit } from 'dev-toolz.library';
import { ConverterHomePageBase } from 'src/converters/shared/pages/converter-home-page-base';
import { VolumeConverterService } from 'src/converters/volume/services/volume-converter/volume-converter.service';
import { NavigationHelper } from 'src/shared/helpers/navigationHelper';
import { PageBase } from 'src/shared/pages/pageBase';

@Component({
  selector: 'volume-page',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
  ],
  templateUrl: './volume-page.component.html',
  styleUrl: './volume-page.component.scss'
})
export class VolumePageComponent extends ConverterHomePageBase implements OnInit {
  // service!: IUnitConverter;
  // availableUnits: Unit[] = [];
  // groupedUnits: Array<{ key: Unit, units: Unit[] }> = [];

  constructor(
    factory: ConverterFactory,
    meta: Meta,
    title: Title,
    // public volumeConverterService: VolumeConverterService,
  ) {
    super(factory, meta, title, "volume");
    // this.service = this._convertersFactory.getConverter('volume');
  }

  // private _setSEOInfo() {
  //   const description = 'Converta facilmente entre diferentes unidades de volume como litros, mililitros, metros cúbicos, galões e muito mais. Calculadora precisa com explicações detalhadas.';
  //   const pageTitle = 'Conversor de Volume - Todas as Unidades';

  //   this.setTitle(pageTitle);
  //   this.addDescription(description);

  //   // Atualizar metadados para SEO
  //   this.updateSeo({
  //     title: pageTitle,
  //     description: description,
  //     keywords: 'conversor de volume, litros para mililitros, metros cúbicos, galões, onças fluídas, conversão de líquidos, calculadora de volume'
  //   });

  //   // Adicionar Schema.org para rich snippets
  //   this.addSchemaOrgData('SoftwareApplication', {
  //     name: 'Conversor de Volume',
  //     description: description,
  //     applicationCategory: 'UtilityApplication',
  //     operatingSystem: 'Web'
  //   });
  // }

  // private _groupList(): void {
  //   for (const unitKey of this.availableUnits) {
  //     const key = unitKey.id;

  //     for (const unit of this.availableUnits) {
  //       if (unit.id === key) {
  //         continue; // Ignorar unidades iguais
  //       }

  //       // Verifica se o grupo já existe
  //       const existingGroup = this.groupedUnits.find(g => g.key.id === key);

  //       if (existingGroup) {
  //         // Se o grupo já existe, adiciona a unidade
  //         existingGroup.units.push(unit);
  //       } else {
  //         // Se não existe, cria um novo grupo
  //         this.groupedUnits.push({ key: unitKey, units: [unit] });
  //       }
  //     }
  //   }
  // }

  ngOnInit() {
    // this.availableUnits = this.service.getUnits();
    // this._groupList();
    // this._setSEOInfo();
    const pageTitle = 'Conversor de Volume';
    const description = 'Converta facilmente entre diferentes unidades de volume como litros, mililitros, metros cúbicos, galões e muito mais. Calculadora precisa com explicações detalhadas.';
    const keywords = 'conversor de volume, litros para mililitros, metros cúbicos, galões, onças fluídas, conversão de líquidos, calculadora de volume';

    this.onInit(
      pageTitle,
      description,
      keywords,
    );
  }

  ngAfterViewInit() {
    // // Configurar navegação por âncoras na página
    // NavigationHelper.setupAnchorNavigation();
    // // Configurar exibição da navegação rápida durante rolagem
    // NavigationHelper.setupScrollWatch(400);
    this.navigationHelper();
  }
}