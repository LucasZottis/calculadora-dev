import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SerializationConverter } from 'devtoolz-library/dist/converters/serialization/serialization.converter';
import { UnitUrlFormatterService } from 'src/converters/shared/services/unit-url-formatter.service';
import { PageBase } from 'src/shared/pages/pageBase';
import { DATA_FORMATS } from '../../serialization.data';
import { DataFormat } from '../../models/data-format.model';
import { BreadcrumbItem } from 'src/shared/models/breadcrumb-item';

import { BreadcrumbsComponent } from 'src/shared/components/breadcrumbs/breadcrumbs.component';
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
    BreadcrumbsComponent
  ],
    templateUrl: './serialization-converter-page.component.html',
    styleUrl: './serialization-converter-page.component.scss'
})
export class SerializationConverterPageComponent extends PageBase implements OnInit {
    readonly formats: DataFormat[] = DATA_FORMATS;

    get breadcrumbItems(): BreadcrumbItem[] {
        return [
            { label: 'Início', link: '/' },
            { label: 'Conversores', link: '/conversores' },
            { label: 'Serialização de Dados', link: '/conversores/serialization' },
            { label: `Converter ${this.sourceFormat?.name} para ${this.targetFormat?.name}` },
        ];
    }

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

    // Opções CSV → JSON
    considerEmptyAsNull: boolean = false;
    compactOutput: boolean = false;

    // Opções JSON → CSV
    includeHeader: boolean = true;
    quoteAllFields: boolean = false;
    nullAsEmpty: boolean = false;
    outputBom: boolean = false;

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

    get isJsonToCsv(): boolean {
        return this.sourceFormat?.id === 'json' && this.targetFormat?.id === 'csv';
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
            } else if (this.isJsonToCsv) {
                result = this._applyCsvOptions(result);
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

    private _applyCsvOptions(csvString: string): string {
        let lines = csvString.split('\n');

        if (this.nullAsEmpty || this.quoteAllFields) {
            lines = lines.map((line, index) => {
                if (!line.trim()) return line;
                const isHeader = index === 0;
                const fields = this._parseCsvLine(line, this.separatorCharacter);
                const processed = fields.map(f => {
                    let value = (!isHeader && this.nullAsEmpty && f === 'null') ? '' : f;
                    if (this.quoteAllFields) {
                        return `"${value.replace(/"/g, '""')}"`;
                    }
                    return value;
                });
                return processed.join(this.separatorCharacter);
            });
        }

        if (!this.includeHeader) {
            lines = lines.slice(1);
        }

        let result = lines.join('\n');

        if (this.outputBom) {
            result = '\uFEFF' + result;
        }

        return result;
    }

    private _parseCsvLine(line: string, separator: string): string[] {
        const fields: string[] = [];
        let current = '';
        let inQuotes = false;

        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            if (char === '"') {
                if (inQuotes && line[i + 1] === '"') {
                    current += '"';
                    i++;
                } else {
                    inQuotes = !inQuotes;
                }
            } else if (char === separator && !inQuotes) {
                fields.push(current);
                current = '';
            } else {
                current += char;
            }
        }
        fields.push(current);
        return fields;
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
