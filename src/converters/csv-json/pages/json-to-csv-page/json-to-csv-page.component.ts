import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PageBase } from 'src/shared/pages/pageBase';

@Component({
    selector: 'json-to-csv-page',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
    ],
    templateUrl: './json-to-csv-page.component.html',
    styleUrl: './json-to-csv-page.component.scss'
})
export class JsonToCsvPageComponent extends PageBase implements OnInit {
    jsonValue: string = '';
    csvValue: string = '';
    errorMessage: string = '';
    warningMessage: string = '';

    ngOnInit(): void {
        const pageTitle = 'Converter JSON para CSV';
        const description = 'Converta JSON para CSV de forma rápida e precisa. Ferramenta online gratuita para exportar dados JSON em formato tabular.';
        const keywords = 'converter json para csv, json csv, conversor json, converter json online';

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

    onConvert(): void {
        this.errorMessage = '';
        this.warningMessage = '';

        if (!this.jsonValue?.trim()) {
            this.warningMessage = 'O campo de entrada está vazio. Por favor, insira um valor para converter.';
            this.csvValue = '';
            return;
        }

        try {
            this.csvValue = this._jsonToCsv(this.jsonValue);
        } catch (err: any) {
            this.errorMessage = err?.message ?? 'JSON inválido. Verifique o formato e tente novamente.';
            this.csvValue = '';
        }
    }

    onClear(): void {
        this.jsonValue = '';
        this.csvValue = '';
        this.errorMessage = '';
        this.warningMessage = '';
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
}
