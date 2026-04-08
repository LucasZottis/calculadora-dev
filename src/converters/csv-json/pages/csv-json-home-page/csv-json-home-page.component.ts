import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PageBase } from 'src/shared/pages/pageBase';

@Component({
    selector: 'csv-json-home-page',
    standalone: true,
    imports: [
        RouterModule,
        CommonModule,
    ],
    templateUrl: './csv-json-home-page.component.html',
    styleUrl: './csv-json-home-page.component.scss'
})
export class CsvJsonHomePageComponent extends PageBase implements OnInit {
    readonly conversions = [
        { path: 'csv-para-json', label: 'CSV para JSON' },
        { path: 'json-para-csv', label: 'JSON para CSV' },
    ];

    ngOnInit(): void {
        const pageTitle = 'Conversor CSV/JSON';
        const description = 'Converta dados entre os formatos CSV e JSON de forma rápida e precisa. Ferramenta online gratuita para desenvolvedores e analistas de dados.';
        const keywords = 'conversor csv json, csv para json, json para csv, converter csv, converter json';

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
