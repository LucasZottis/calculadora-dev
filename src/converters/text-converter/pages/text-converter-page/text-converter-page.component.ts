import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TextConverter } from 'devtoolz-library/dist/converters/text-format/textFormatConverter.converter';
import { UnitUrlFormatterService } from 'src/converters/shared/services/unit-url-formatter.service';
import { PageBase } from 'src/shared/pages/pageBase';
import { TEXT_FORMATS } from '../../text-converter.data';
import { TextFormat } from '../../models/text-format.model';

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
    readonly formats: TextFormat[] = TEXT_FORMATS;

    sourceFormat!: TextFormat;
    targetFormat!: TextFormat;
    sourceValue: string = '';
    targetValue: string = '';
    errorMessage: string = '';

    private readonly route: ActivatedRoute = inject(ActivatedRoute);
    private readonly router: Router = inject(Router);
    private readonly urlFormatter: UnitUrlFormatterService = inject(UnitUrlFormatterService);
    private readonly converter = new TextConverter();

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            const conversionParam = params['conversion'];
            const parsed = conversionParam
                ? this.urlFormatter.parseConversionUrl(conversionParam)
                : null;

            const source = parsed
                ? this.formats.find(f => f.id === parsed.sourceUnitId)
                : null;
            const target = parsed
                ? this.formats.find(f => f.id === parsed.targetUnitId)
                : null;

            if (!source || !target || source.id === target.id || !this._isValidPair(source.id, target.id)) {
                this.router.navigate(['/conversores/texto']);
                return;
            }

            this.sourceFormat = source;
            this.targetFormat = target;
            this._updatePageMeta();
            this._convert();
        });
    }

    onSourceFormatChange(): void {
        if (this.sourceFormat.id === this.targetFormat.id || !this._isValidPair(this.sourceFormat.id, this.targetFormat.id)) {
            const next = this.formats.find(f => f.id !== this.sourceFormat.id && this._isValidPair(this.sourceFormat.id, f.id));
            if (next) this.targetFormat = next;
        }
        this.sourceValue = '';
        this.targetValue = '';
        this.errorMessage = '';
        this._updateUrl();
        this._updatePageMeta();
    }

    onTargetFormatChange(): void {
        if (this.targetFormat.id === this.sourceFormat.id || !this._isValidPair(this.sourceFormat.id, this.targetFormat.id)) {
            const next = this.formats.find(f => f.id !== this.targetFormat.id && this._isValidPair(f.id, this.targetFormat.id));
            if (next) this.sourceFormat = next;
        }
        this.sourceValue = '';
        this.targetValue = '';
        this.errorMessage = '';
        this._updateUrl();
        this._updatePageMeta();
    }

    onSourceValueChange(): void {
        this._convert();
    }

    get sourcePlaceholder(): string {
        switch (this.sourceFormat?.id) {
            case 'texto': return 'Ex: Olá, mundo!';
            case 'binario': return 'Ex: 01001111 01101100 11000011 10100001';
            case 'morse': return 'Ex: ... --- ...   .-. ..- -. -.. ---';
            default: return '';
        }
    }

    compareById(a: TextFormat, b: TextFormat): boolean {
        return a?.id === b?.id;
    }

    private _isValidPair(sourceId: string, targetId: string): boolean {
        return sourceId !== targetId && (sourceId === 'texto' || targetId === 'texto');
    }

    private _convert(): void {
        this.errorMessage = '';

        if (!this.sourceValue?.trim()) {
            this.targetValue = '';
            return;
        }

        try {
            const sourceApiId = this._toApiFormat(this.sourceFormat.id);
            const targetApiId = this._toApiFormat(this.targetFormat.id);
            this.targetValue = this.converter.convert(this.sourceValue, sourceApiId, targetApiId);
        } catch {
            this.errorMessage = 'Valor inválido. Verifique o formato e tente novamente.';
            this.targetValue = '';
        }
    }

    private _toApiFormat(formatId: string): string {
        switch (formatId) {
            case 'texto': return 'text';
            case 'binario': return 'binary';
            case 'morse': return 'morse';
            default: return formatId;
        }
    }

    private _updateUrl(): void {
        const url = this.urlFormatter.generateConversionUrl(this.sourceFormat.id, this.targetFormat.id);
        this.router.navigate(['/conversores/texto/' + url], { replaceUrl: true });
    }

    private _updatePageMeta(): void {
        const pageTitle = `Converter ${this.sourceFormat.name} para ${this.targetFormat.name}`;
        const description = `Converta ${this.sourceFormat.name.toLowerCase()} para ${this.targetFormat.name.toLowerCase()} de forma rápida e precisa. Ferramenta online gratuita para codificação e decodificação de texto.`;
        const keywords = `converter ${this.sourceFormat.name.toLowerCase()} para ${this.targetFormat.name.toLowerCase()}, ${this.sourceFormat.name.toLowerCase()} ${this.targetFormat.name.toLowerCase()}, codificacao texto`;

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
