import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PageBase } from 'src/shared/pages/pageBase';

@Component({
    selector: 'text-converter-home-page',
    standalone: true,
    imports: [
        RouterModule,
        CommonModule,
    ],
    templateUrl: './text-converter-home-page.component.html',
    styleUrl: './text-converter-home-page.component.scss'
})
export class TextConverterHomePageComponent extends PageBase implements OnInit {
    readonly converters = [
        {
            route: '/conversores/texto-para-binario',
            icon: 'text_fields',
            name: 'Texto para Binário',
            description: 'Converta texto em código binário e vice-versa',
        },
        {
            route: '/conversores/texto-para-morse',
            icon: 'rss_feed',
            name: 'Código Morse',
            description: 'Converta texto em código Morse e vice-versa',
        },
    ];

    ngOnInit(): void {
        const pageTitle = 'Conversor de Texto';
        const description = 'Converta texto para diferentes formatos de codificação como binário e código Morse. Ferramentas online gratuitas para codificação e decodificação de texto.';
        const keywords = 'conversor texto, texto binario, codigo morse, converter texto, codificacao texto';

        this.setTitle(pageTitle);
        this.addDescription(description);
        this.updateSeo({ title: pageTitle, description, keywords });

        this.addSchemaOrgData('SoftwareApplication', {
            name: pageTitle,
            description,
            applicationCategory: 'UtilityApplication',
            operatingSystem: 'Web'
        });
    }
}
