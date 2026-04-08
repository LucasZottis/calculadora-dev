import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SerializationConverter } from 'devtoolz-library/dist/converters/serialization/serialization.converter';
import { UnitUrlFormatterService } from 'src/converters/shared/services/unit-url-formatter.service';
import { PageBase } from 'src/shared/pages/pageBase';
import { DATA_FORMATS } from '../../serialization.data';
import { DataFormat } from '../../models/data-format.model';

interface SeparatorOption {
    label: string;
    value: string;
}

@Component({
    selector: 'serialization-converter-page',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
    ],
    templateUrl: './serialization-converter-page.component.html',
    styleUrl: './serialization-converter-page.component.scss'
})
export class SerializationConverterPageComponent extends PageBase implements OnInit {
    readonly formats: DataFormat[] = DATA_FORMATS;

    readonly separatorOptions: SeparatorOption[] = [
        { label: 'Vírgula (,)', value: ',' },
        { label: 'Ponto e vírgula (;)', value: ';' },
        { label: 'Tabulação (\\t)', value: '\t' },
        { label: 'Pipe (|)', value: '|' },
    ];

    sourceFormat!: DataFormat;
    targetFormat!: DataFormat;
    sourceValue: string = '';
    targetValue: string = '';
    errorMessage: string = '';
    warningMessage: string = '';

    // Opções de personalização
    separatorCharacter: string = ',';
    considerEmptyAsNull: boolean = false;
    compactOutput: boolean = false;

    private readonly route: ActivatedRoute = inject(ActivatedRoute);
    private readonly router: Router = inject(Router);
    private readonly urlFormatter: UnitUrlFormatterService = inject(UnitUrlFormatterService);
    private readonly converter = new SerializationConverter();

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

            if (!source || !target || source.id === target.id) {
                this.router.navigate(['/conversores/serialization']);
                return;
            }

            this.sourceFormat = source;
            this.targetFormat = target;
            this._updatePageMeta();
        });
    }

    onSourceFormatChange(): void {
        if (this.sourceFormat.id === this.targetFormat.id) {
            const next = this.formats.find(f => f.id !== this.sourceFormat.id);
            if (next) this.targetFormat = next;
        }
        this._clearOutput();
        this._updateUrl();
        this._updatePageMeta();
    }

    onTargetFormatChange(): void {
        if (this.targetFormat.id === this.sourceFormat.id) {
            const next = this.formats.find(f => f.id !== this.targetFormat.id);
            if (next) this.sourceFormat = next;
        }
        this._clearOutput();
        this._updateUrl();
        this._updatePageMeta();
    }

    swapFormats(): void {
        const temp = this.sourceFormat;
        this.sourceFormat = this.targetFormat;
        this.targetFormat = temp;
        this._clearOutput();
        this._updateUrl();
        this._updatePageMeta();
    }

    onConvert(): void {
        this._convert();
    }

    onClear(): void {
        this.sourceValue = '';
        this._clearOutput();
    }

    compareById(a: DataFormat, b: DataFormat): boolean {
        return a?.id === b?.id;
    }

    get isCsvToJson(): boolean {
        return this.sourceFormat?.id === 'csv' && this.targetFormat?.id === 'json';
    }

    get sourcePlaceholder(): string {
        switch (this.sourceFormat?.id) {
            case 'csv': return `Ex:\nnome,idade,cidade\nAna,30,São Paulo\nBruno,25,Rio de Janeiro`;
            case 'json': return 'Ex:\n[\n  { "nome": "Ana", "idade": 30 },\n  { "nome": "Bruno", "idade": 25 }\n]';
            default: return '';
        }
    }

    private _clearOutput(): void {
        this.targetValue = '';
        this.errorMessage = '';
        this.warningMessage = '';
    }

    private _convert(): void {
        this.errorMessage = '';
        this.warningMessage = '';

        if (!this.sourceValue?.trim()) {
            this.warningMessage = 'O campo de entrada está vazio. Por favor, insira um valor para converter.';
            this.targetValue = '';
            return;
        }

        try {
            let result = this.converter.convert(
                this.sourceValue,
                this.sourceFormat.id,
                this.targetFormat.id,
                { separatorCharacter: this.separatorCharacter, considerEmptyAsNull: false }
            );

            if (this.isCsvToJson) {
                result = this._applyJsonOptions(result);
            }

            this.targetValue = result;
        } catch (err: any) {
            this.errorMessage = err?.message ?? 'Valor inválido. Verifique o formato e tente novamente.';
            this.targetValue = '';
        }
    }

    private _applyJsonOptions(jsonString: string): string {
        let data = JSON.parse(jsonString);

        if (this.considerEmptyAsNull) {
            data = data.map((obj: Record<string, any>) => {
                const result: Record<string, any> = {};
                for (const key of Object.keys(obj)) {
                    result[key] = obj[key] === '' ? null : obj[key];
                }
                return result;
            });
        }

        return this.compactOutput
            ? JSON.stringify(data)
            : JSON.stringify(data, null, 2);
    }

    private _updateUrl(): void {
        const url = this.urlFormatter.generateConversionUrl(this.sourceFormat.id, this.targetFormat.id);
        this.router.navigate(['/conversores/serialization/' + url], { replaceUrl: true });
    }

    private _updatePageMeta(): void {
        const pageTitle = `Converter ${this.sourceFormat.name} para ${this.targetFormat.name}`;
        const description = `Converta ${this.sourceFormat.name} para ${this.targetFormat.name} de forma rápida e precisa. Ferramenta online gratuita para conversão de dados.`;
        const keywords = `converter ${this.sourceFormat.name.toLowerCase()} para ${this.targetFormat.name.toLowerCase()}, ${this.sourceFormat.name.toLowerCase()} ${this.targetFormat.name.toLowerCase()}, conversor dados`;

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
