import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TextConverter } from 'devtoolz-library/dist/converters/text-format/textFormatConverter.converter';
import { PageBase } from 'src/shared/pages/pageBase';

@Component({
    selector: 'texto-binario-page',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
    ],
    templateUrl: './texto-binario-page.component.html',
    styleUrl: './texto-binario-page.component.scss'
})
export class TextoBinarioPageComponent extends PageBase implements OnInit {
    sourceValue: string = '';
    targetValue: string = '';
    errorMessage: string = '';
    mode: 'text-to-binary' | 'binary-to-text' = 'text-to-binary';

    private readonly converter = new TextConverter();

    ngOnInit(): void {
        this._updatePageMeta();
    }

    get sourceLabel(): string {
        return this.mode === 'text-to-binary' ? 'Texto' : 'Binário';
    }

    get targetLabel(): string {
        return this.mode === 'text-to-binary' ? 'Binário' : 'Texto';
    }

    get sourcePlaceholder(): string {
        return this.mode === 'text-to-binary'
            ? 'Ex: Olá, mundo!'
            : 'Ex: 01001111 01101100 11000011 10100001';
    }

    onSourceValueChange(): void {
        this._convert();
    }

    onModeChange(): void {
        this.sourceValue = '';
        this.targetValue = '';
        this.errorMessage = '';
    }

    private _convert(): void {
        this.errorMessage = '';

        if (!this.sourceValue?.trim()) {
            this.targetValue = '';
            return;
        }

        try {
            if (this.mode === 'text-to-binary') {
                this.targetValue = this.converter.convert(this.sourceValue, 'text', 'binary');
            } else {
                this.targetValue = this.converter.convert(this.sourceValue, 'binary', 'text');
            }
        } catch {
            this.errorMessage = 'Valor inválido. Verifique o formato e tente novamente.';
            this.targetValue = '';
        }
    }

    private _updatePageMeta(): void {
        const pageTitle = 'Converter Texto para Binário';
        const description = 'Converta texto para binário e binário para texto de forma rápida e precisa. Ferramenta online gratuita para codificação e decodificação binária.';
        const keywords = 'converter texto para binario, texto binario, binario para texto, codificacao binaria, decodificacao binaria, ASCII binario';

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
