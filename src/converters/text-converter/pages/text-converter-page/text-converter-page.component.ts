import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TextConverter } from 'devtoolz-library/dist/converters/text-format/textFormatConverter.converter';
import { PageBase } from 'src/shared/pages/pageBase';

type TextFormat = 'binary' | 'morse';
type ConversionDirection = 'forward' | 'reverse';

@Component({
    selector: 'text-converter-page',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
    ],
    templateUrl: './text-converter-page.component.html',
    styleUrl: './text-converter-page.component.scss'
})
export class TextConverterPageComponent extends PageBase implements OnInit {
    sourceValue: string = '';
    targetValue: string = '';
    errorMessage: string = '';
    direction: ConversionDirection = 'forward';
    format!: TextFormat;

    private readonly route: ActivatedRoute = inject(ActivatedRoute);
    private readonly router: Router = inject(Router);
    private readonly converter = new TextConverter();

    ngOnInit(): void {
        this.format = this.route.snapshot.data['format'] as TextFormat;
        this._updatePageMeta();
    }

    get sourceLabel(): string {
        if (this.direction === 'forward') return 'Texto';
        return this.format === 'binary' ? 'Binário' : 'Morse';
    }

    get targetLabel(): string {
        if (this.direction === 'forward') return this.format === 'binary' ? 'Binário' : 'Morse';
        return 'Texto';
    }

    get sourcePlaceholder(): string {
        if (this.direction === 'forward') return 'Ex: Olá, mundo!';
        return this.format === 'binary'
            ? 'Ex: 01001111 01101100 11000011 10100001'
            : 'Ex: ... --- ...   .-. ..- -. -.. ---';
    }

    get forwardLabel(): string {
        return this.format === 'binary' ? 'Texto → Binário' : 'Texto → Morse';
    }

    get reverseLabel(): string {
        return this.format === 'binary' ? 'Binário → Texto' : 'Morse → Texto';
    }

    get otherFormatRoute(): string {
        return this.format === 'binary'
            ? '/conversores/texto-para-morse'
            : '/conversores/texto-para-binario';
    }

    get otherFormatLabel(): string {
        return this.format === 'binary' ? 'Converter Texto para Morse' : 'Converter Texto para Binário';
    }

    onSourceValueChange(): void {
        this._convert();
    }

    onDirectionChange(): void {
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
            if (this.direction === 'forward') {
                this.targetValue = this.converter.convert(this.sourceValue, 'text', this.format);
            } else {
                this.targetValue = this.converter.convert(this.sourceValue, this.format, 'text');
            }
        } catch {
            this.errorMessage = 'Valor inválido. Verifique o formato e tente novamente.';
            this.targetValue = '';
        }
    }

    private _updatePageMeta(): void {
        const isBinary = this.format === 'binary';
        const pageTitle = isBinary ? 'Converter Texto para Binário' : 'Converter Texto para Código Morse';
        const description = isBinary
            ? 'Converta texto para binário e binário para texto de forma rápida e precisa. Ferramenta online gratuita para codificação e decodificação binária.'
            : 'Converta texto para código Morse e código Morse para texto de forma rápida e precisa. Ferramenta online gratuita para codificação e decodificação Morse.';
        const keywords = isBinary
            ? 'converter texto para binario, texto binario, binario para texto, codificacao binaria, decodificacao binaria, ASCII binario'
            : 'converter texto para morse, codigo morse, morse para texto, decodificar morse, codificar morse, alfabeto morse';

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
