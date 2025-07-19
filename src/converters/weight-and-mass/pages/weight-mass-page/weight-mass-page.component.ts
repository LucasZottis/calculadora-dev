import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UnitConverterFactory } from 'dev-toolz.library';
import { ConverterHomePageBase } from 'src/converters/shared/pages/converter-home-page-base';

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
export class WeightMassPageComponent extends ConverterHomePageBase implements OnInit {
    constructor(
        factory: UnitConverterFactory,
        meta: Meta,
        title: Title,
    ) {
        super(factory, meta, title, 'weight-mass');
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