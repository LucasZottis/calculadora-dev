import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NumericSystemConverter } from 'devtoolz-library';
import { UnitUrlFormatterService } from 'src/converters/shared/services/unit-url-formatter.service';
import { PageBase } from 'src/shared/pages/pageBase';
import { NUMERIC_SYSTEMS } from '../../numeric-systems.data';
import { NumericSystem } from '../../models/numeric-system.model';

@Component({
    selector: 'numeric-systems-converter-page',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
    ],
    templateUrl: './numeric-systems-converter-page.component.html',
    styleUrl: './numeric-systems-converter-page.component.scss'
})
export class NumericSystemsConverterPageComponent extends PageBase implements OnInit {
    readonly systems: NumericSystem[] = NUMERIC_SYSTEMS;

    sourceSystem!: NumericSystem;
    targetSystem!: NumericSystem;
    sourceValue: string = '0';
    targetValue: string = '';
    errorMessage: string = '';

    private readonly converter = new NumericSystemConverter();

    constructor(
        meta: Meta,
        title: Title,
        private readonly route: ActivatedRoute,
        private readonly router: Router,
        private readonly urlFormatter: UnitUrlFormatterService,
    ) {
        super(meta, title);
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            const conversionParam = params['conversion'];
            const parsed = conversionParam
                ? this.urlFormatter.parseConversionUrl(conversionParam)
                : null;

            const source = parsed
                ? this.systems.find(s => s.id === parsed.sourceUnitId)
                : null;
            const target = parsed
                ? this.systems.find(s => s.id === parsed.targetUnitId)
                : null;

            if (!source || !target || source.id === target.id) {
                this.router.navigate(['/conversores/sistemas-numericos']);
                return;
            }

            this.sourceSystem = source;
            this.targetSystem = target;
            this._updatePageMeta();
            this._convert();
        });
    }

    onSourceSystemChange(): void {
        if (this.sourceSystem.id === this.targetSystem.id) {
            const next = this.systems.find(s => s.id !== this.sourceSystem.id);
            if (next) this.targetSystem = next;
        }
        this._updateUrl();
        this._updatePageMeta();
        this._convert();
    }

    onTargetSystemChange(): void {
        if (this.targetSystem.id === this.sourceSystem.id) {
            const next = this.systems.find(s => s.id !== this.targetSystem.id);
            if (next) this.sourceSystem = next;
        }
        this._updateUrl();
        this._updatePageMeta();
        this._convert();
    }

    onSourceValueChange(): void {
        this._convert();
    }

    private _convert(): void {
        this.errorMessage = '';
        const raw = this.sourceValue?.trim();

        if (!raw || raw === '0' || raw === '') {
            this.targetValue = '0';
            return;
        }

        try {
            this.targetValue = this.converter.convert(raw.toUpperCase(), this.sourceSystem.id, this.targetSystem.id);
        } catch {
            this.errorMessage = `Valor inválido para o sistema ${this.sourceSystem.name}.`;
            this.targetValue = '';
        }
    }

    private _updateUrl(): void {
        const url = this.urlFormatter.generateConversionUrl(this.sourceSystem.id, this.targetSystem.id);
        this.router.navigate(['/conversores/sistemas-numericos/' + url], { replaceUrl: true });
    }

    private _updatePageMeta(): void {
        const title = `Converter ${this.sourceSystem.name} para ${this.targetSystem.name}`;
        const description = `Ferramenta para converter ${this.sourceSystem.name.toLowerCase()} (${this.sourceSystem.symbol}) para ${this.targetSystem.name.toLowerCase()} (${this.targetSystem.symbol}). Conversão instantânea e precisa.`;
        this.setTitle(title);
        this.addDescription(description);
    }

    getValidationPattern(): string {
        switch (this.sourceSystem?.id) {
            case 'binary':      return '[01]*';
            case 'octadecimal': return '[0-7]*';
            case 'decimal':     return '[0-9]*';
            case 'hexadecimal': return '[0-9a-fA-F]*';
            case 'roman':       return '[IVXLCDMivxlcdm]*';
            default:            return '.*';
        }
    }

    getInputPlaceholder(): string {
        switch (this.sourceSystem?.id) {
            case 'binary':      return 'Ex: 1010';
            case 'octadecimal': return 'Ex: 17';
            case 'decimal':     return 'Ex: 255';
            case 'hexadecimal': return 'Ex: FF';
            case 'roman':       return 'Ex: XIV';
            default:            return '';
        }
    }

    compareById(a: NumericSystem, b: NumericSystem): boolean {
        return a?.id === b?.id;
    }
}
