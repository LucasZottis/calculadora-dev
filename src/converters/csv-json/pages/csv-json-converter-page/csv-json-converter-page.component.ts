import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UnitUrlFormatterService } from 'src/converters/shared/services/unit-url-formatter.service';
import { PageBase } from 'src/shared/pages/pageBase';
import { DATA_FORMATS } from '../../csv-json.data';
import { DataFormat } from '../../models/data-format.model';

@Component({
    selector: 'csv-json-converter-page',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
    ],
    templateUrl: './csv-json-converter-page.component.html',
    styleUrl: './csv-json-converter-page.component.scss'
})
export class CsvJsonConverterPageComponent extends PageBase implements OnInit {
    readonly formats: DataFormat[] = DATA_FORMATS;

    sourceFormat!: DataFormat;
    targetFormat!: DataFormat;
    sourceValue: string = '';
    targetValue: string = '';
    errorMessage: string = '';
    warningMessage: string = '';

    private readonly route: ActivatedRoute = inject(ActivatedRoute);
    private readonly router: Router = inject(Router);
    private readonly urlFormatter: UnitUrlFormatterService = inject(UnitUrlFormatterService);

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
                this.router.navigate(['/conversores/csv-json']);
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

    get sourcePlaceholder(): string {
        if (this.sourceFormat?.id === 'csv') {
            return 'Ex:\nnome,idade,cidade\nAna,30,São Paulo\nBruno,25,Rio de Janeiro';
        }
        return 'Ex:\n[\n  { "nome": "Ana", "idade": 30, "cidade": "São Paulo" },\n  { "nome": "Bruno", "idade": 25, "cidade": "Rio de Janeiro" }\n]';
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
            if (this.sourceFormat.id === 'csv' && this.targetFormat.id === 'json') {
                this.targetValue = this._csvToJson(this.sourceValue);
            } else if (this.sourceFormat.id === 'json' && this.targetFormat.id === 'csv') {
                this.targetValue = this._jsonToCsv(this.sourceValue);
            }
        } catch (err: any) {
            this.errorMessage = err?.message ?? 'Valor inválido. Verifique o formato e tente novamente.';
            this.targetValue = '';
        }
    }

    private _csvToJson(csv: string): string {
        const lines = csv.split('\n').map(l => l.trimEnd()).filter(l => l.trim().length > 0);

        if (lines.length === 0) {
            throw new Error('CSV inválido: conteúdo vazio.');
        }

        const headers = this._parseCSVLine(lines[0]);

        if (headers.length === 0 || headers.every(h => h === '')) {
            throw new Error('CSV inválido: a primeira linha deve conter os cabeçalhos das colunas.');
        }

        if (lines.length === 1) {
            return '[]';
        }

        const result: Record<string, string>[] = [];

        for (let i = 1; i < lines.length; i++) {
            const values = this._parseCSVLine(lines[i]);
            const obj: Record<string, string> = {};
            headers.forEach((header, index) => {
                obj[header] = values[index] ?? '';
            });
            result.push(obj);
        }

        return JSON.stringify(result, null, 2);
    }

    private _parseCSVLine(line: string): string[] {
        const result: string[] = [];
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
            } else if (char === ',' && !inQuotes) {
                result.push(current.trim());
                current = '';
            } else {
                current += char;
            }
        }

        result.push(current.trim());
        return result;
    }

    private _jsonToCsv(json: string): string {
        let data: any;

        try {
            data = JSON.parse(json);
        } catch {
            throw new Error('JSON inválido: verifique a sintaxe e tente novamente.');
        }

        if (!Array.isArray(data)) {
            throw new Error('JSON inválido: o conteúdo deve ser um array de objetos.');
        }

        if (data.length === 0) {
            throw new Error('JSON inválido: o array está vazio.');
        }

        const hasNestedObjects = data.some((item: any) =>
            Object.values(item).some(v => typeof v === 'object' && v !== null)
        );

        if (hasNestedObjects) {
            throw new Error('JSON inválido: estruturas aninhadas não são suportadas. Use apenas objetos simples.');
        }

        const headers = Object.keys(data[0]);
        const csvLines = [
            headers.map(h => this._escapeCSVValue(h)).join(','),
            ...data.map((obj: Record<string, any>) =>
                headers.map(h => this._escapeCSVValue(String(obj[h] ?? ''))).join(',')
            )
        ];

        return csvLines.join('\n');
    }

    private _escapeCSVValue(value: string): string {
        if (value.includes(',') || value.includes('"') || value.includes('\n')) {
            return '"' + value.replace(/"/g, '""') + '"';
        }
        return value;
    }

    private _updateUrl(): void {
        const url = this.urlFormatter.generateConversionUrl(this.sourceFormat.id, this.targetFormat.id);
        this.router.navigate(['/conversores/csv-json/' + url], { replaceUrl: true });
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
