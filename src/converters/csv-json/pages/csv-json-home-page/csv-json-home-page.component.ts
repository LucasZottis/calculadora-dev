import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UnitUrlFormatterService } from 'src/converters/shared/services/unit-url-formatter.service';
import { PageBase } from 'src/shared/pages/pageBase';
import { DATA_FORMATS } from '../../csv-json.data';
import { DataFormat } from '../../models/data-format.model';

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
    readonly unitUrlFormatterService: UnitUrlFormatterService = inject(UnitUrlFormatterService);

    readonly groupedFormats: { key: DataFormat; targets: DataFormat[] }[] = DATA_FORMATS
        .map(source => ({
            key: source,
            targets: DATA_FORMATS.filter(target => target.id !== source.id),
        }))
        .filter(group => group.targets.length > 0);

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
