import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PageBase } from 'src/shared/pages/pageBase';

@Component({
    selector: 'csv-to-json-page',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
    ],
    templateUrl: './csv-to-json-page.component.html',
    styleUrl: './csv-to-json-page.component.scss'
})
export class CsvToJsonPageComponent extends PageBase implements OnInit {
    csvValue: string = '';
    jsonValue: string = '';
    errorMessage: string = '';
    warningMessage: string = '';

    ngOnInit(): void {
        const pageTitle = 'Converter CSV para JSON';
        const description = 'Converta CSV para JSON de forma rápida e precisa. Ferramenta online gratuita para conversão de dados tabulares.';
        const keywords = 'converter csv para json, csv json, conversor csv, converter csv online';

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

        if (!this.csvValue?.trim()) {
            this.warningMessage = 'O campo de entrada está vazio. Por favor, insira um valor para converter.';
            this.jsonValue = '';
            return;
        }

        try {
            this.jsonValue = this._csvToJson(this.csvValue);
        } catch (err: any) {
            this.errorMessage = err?.message ?? 'CSV inválido. Verifique o formato e tente novamente.';
            this.jsonValue = '';
        }
    }

    onClear(): void {
        this.csvValue = '';
        this.jsonValue = '';
        this.errorMessage = '';
        this.warningMessage = '';
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
}
