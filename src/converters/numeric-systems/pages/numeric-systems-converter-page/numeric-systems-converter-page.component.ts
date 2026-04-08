import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NumericSystemConverter } from 'devtoolz-library';
import { UnitUrlFormatterService } from 'src/converters/shared/services/unit-url-formatter.service';
import { PageBase } from 'src/shared/pages/pageBase';
import { NUMERIC_SYSTEMS } from '../../numeric-systems.data';
import { NumericSystem } from '../../models/numeric-system.model';
import { BreadcrumbItem } from 'src/shared/models/breadcrumb-item';

import { BreadcrumbsComponent } from 'src/shared/components/breadcrumbs/breadcrumbs.component';
@Component({
    selector: 'numeric-systems-converter-page',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
    BreadcrumbsComponent
  ],
    templateUrl: './numeric-systems-converter-page.component.html',
    styleUrl: './numeric-systems-converter-page.component.scss'
})
export class NumericSystemsConverterPageComponent extends PageBase implements OnInit {
    private readonly route: ActivatedRoute = inject(ActivatedRoute);
    private readonly router: Router = inject(Router);
    private readonly urlFormatter: UnitUrlFormatterService = inject(UnitUrlFormatterService);

    readonly systems: NumericSystem[] = NUMERIC_SYSTEMS;

    get breadcrumbItems(): BreadcrumbItem[] {
        return [
            { label: 'Início', link: '/' },
            { label: 'Conversores', link: '/conversores' },
            { label: 'Sistemas Numéricos', link: '/conversores/sistemas-numericos' },
            { label: `Converter ${this.sourceSystem?.name} para ${this.targetSystem?.name}` },
        ];
    }

    sourceSystem!: NumericSystem;
    targetSystem!: NumericSystem;
    sourceValue: string = '';
    targetValue: string = '';
    errorMessage: string = '';

    private readonly converter = new NumericSystemConverter();

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
        this.sourceValue = '';
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

    swapSystems(): void {
        const temp = this.sourceSystem;
        this.sourceSystem = this.targetSystem;
        this.targetSystem = temp;
        this.sourceValue = '';
        this.targetValue = '0';
        this.errorMessage = '';
        this._updateUrl();
        this._updatePageMeta();
    }

    onSourceValueChange(): void {
        this._convert();
    }

    onKeyDown(event: KeyboardEvent): void {
        const controlKeys = ['Backspace', 'Delete', 'Tab', 'Enter', 'Escape', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'];
        if (controlKeys.includes(event.key) || event.ctrlKey || event.metaKey) {
            return;
        }

        const pattern = this._getAllowedCharsPattern();
        if (pattern && !pattern.test(event.key)) {
            event.preventDefault();
        }
    }

    onPaste(event: ClipboardEvent): void {
        const pattern = this._getAllowedCharsPattern();
        if (!pattern) return;

        event.preventDefault();
        const pasted = event.clipboardData?.getData('text') ?? '';
        const filtered = pasted.split('').filter(c => pattern.test(c)).join('');
        const input = event.target as HTMLInputElement;
        const start = input.selectionStart ?? 0;
        const end = input.selectionEnd ?? 0;
        const current = this.sourceValue ?? '';
        this.sourceValue = current.substring(0, start) + filtered + current.substring(end);
        this._convert();
    }

    private _getAllowedCharsPattern(): RegExp | null {
        switch (this.sourceSystem?.id) {
            case 'binary': return /^[01]$/;
            case 'octadecimal': return /^[0-7]$/;
            case 'decimal': return /^[0-9]$/;
            case 'hexadecimal': return /^[0-9a-fA-F]$/;
            case 'roman': return /^[IVXLCDMivxlcdm]$/;
            default: return null;
        }
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
            case 'binary': return '[01]*';
            case 'octadecimal': return '[0-7]*';
            case 'decimal': return '[0-9]*';
            case 'hexadecimal': return '[0-9a-fA-F]*';
            case 'roman': return '[IVXLCDMivxlcdm]*';
            default: return '.*';
        }
    }

    getInputPlaceholder(): string {
        switch (this.sourceSystem?.id) {
            case 'binary': return 'Ex: 1010';
            case 'octadecimal': return 'Ex: 17';
            case 'decimal': return 'Ex: 255';
            case 'hexadecimal': return 'Ex: FF';
            case 'roman': return 'Ex: XIV';
            default: return '';
        }
    }

    compareById(a: NumericSystem, b: NumericSystem): boolean {
        return a?.id === b?.id;
    }
}
