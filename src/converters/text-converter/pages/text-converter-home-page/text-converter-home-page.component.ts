import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UnitUrlFormatterService } from 'src/converters/shared/services/unit-url-formatter.service';
import { PageBase } from 'src/shared/pages/pageBase';
import { TEXT_FORMATS } from '../../text-converter.data';
import { TextFormat } from '../../models/text-format.model';

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
    readonly unitUrlFormatterService: UnitUrlFormatterService = inject(UnitUrlFormatterService);

    readonly groupedFormats: { key: TextFormat; targets: TextFormat[] }[] = TEXT_FORMATS
        .map(source => ({
            key: source,
            targets: TEXT_FORMATS.filter(target => target.id !== source.id && this._isValidPair(source.id, target.id)),
        }))
        .filter(group => group.targets.length > 0);

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

    private _isValidPair(sourceId: string, targetId: string): boolean {
        return sourceId !== targetId;
    }
}
