import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ConverterHomePageBase } from 'src/converters/shared/pages/converter-home-page-base';

import { BreadcrumbsComponent } from 'src/shared/components/breadcrumbs/breadcrumbs.component';
@Component({
    selector: 'weight-mass-page',
    standalone: true,
    imports: [
        RouterModule,
        CommonModule,
    BreadcrumbsComponent
  ],
    templateUrl: './weight-mass-page.component.html',
    styleUrl: './weight-mass-page.component.scss'
})
export class WeightMassPageComponent extends ConverterHomePageBase implements OnInit {
    constructor() {
        super('weight-mass', 'Peso e Massa');
    }

    ngOnInit() {
        const description = 'Converta facilmente entre diferentes unidades de peso e massa como quilogramas, gramas, libras, onças, toneladas e muito mais. Calculadora precisa com explicações detalhadas.';
        const pageTitle = 'Conversor de Peso e Massa';

        this.onInit(
            pageTitle,
            description,
            'conversor de peso, conversor de massa, quilogramas para gramas, libras para quilos, onças, conversão de peso, calculadora de massa corporal, toneladas, quilates'
        );
    }

    ngAfterViewInit() {
        this.navigationHelper();
    }
}