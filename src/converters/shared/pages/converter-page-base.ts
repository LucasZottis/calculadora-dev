import { UnitConverterFactory, IUnitConverter, Unit } from "devtoolz-library";
import { PageBase } from "src/shared/pages/pageBase"
import { UnitUrlFormatterService } from "../services/unit-url-formatter.service";
import { inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Meta, Title } from "@angular/platform-browser";
import { CalculatorResult } from "../models/calculatorResult";
import { BreadcrumbItem } from "src/shared/models/breadcrumb-item";

export class ConverterPageBase extends PageBase {
    protected readonly unitUrlFormatter: UnitUrlFormatterService = inject(UnitUrlFormatterService);
    protected readonly route: ActivatedRoute = inject(ActivatedRoute);
    protected readonly router: Router = inject(Router);
    protected readonly convertersFactory = inject(UnitConverterFactory);
    protected readonly service!: IUnitConverter;
    protected readonly units!: Unit[];
    protected readonly selectedCategory!: string;
    protected readonly urlPrefix!: string;

    protected selectedSourceUnit!: Unit;
    protected selectedTargetUnit!: Unit;

    protected sourceValue: string = '0';
    protected targetValue: string = '0';

    protected showFormula: boolean = false;
    protected formulaDescription: string = '';
    protected formulaCalculation: string = '';

    protected readonly categoryLabel: string;

    get breadcrumbItems(): BreadcrumbItem[] {
        return [
            { label: 'Início', link: '/' },
            { label: 'Conversores', link: '/conversores' },
            { label: this.categoryLabel, link: `/conversores/${this.urlPrefix}` },
            { label: `Converter ${this.selectedSourceUnit?.name} para ${this.selectedTargetUnit?.name}` },
        ];
    }

    constructor(
        selectedCategory: string,
        urlPrefix: string,
        categoryLabel: string = '',
    ) {
        super();
        this.selectedCategory = selectedCategory;
        this.urlPrefix = urlPrefix;
        this.categoryLabel = categoryLabel;
        this.service = this.convertersFactory.createService(selectedCategory);
        this.units = this.service.getUnits();
    }

    private _afterUnitChanged(): void {
        this.updateUrl(this.urlPrefix);
        this.updateTitle();
        this.updateFormula();
    }

    protected onInit(initialSourceId: string, initialTargetId: string): void {
        this.selectedSourceUnit = this.service.getUnitById(initialSourceId)!;
        this.selectedTargetUnit = this.service.getUnitById(initialTargetId)!;

        // Verifica se a rota tem parâmetros para configurar a conversão
        this.route.params.subscribe(params => {
            const conversionParam = params['conversion'];

            if (conversionParam) {
                const conversionInfo = this.unitUrlFormatter.parseConversionUrl(conversionParam);
                if (conversionInfo) {
                    const sourceUnit = this.service.getUnitById(conversionInfo.sourceUnitId);
                    const targetUnit = this.service.getUnitById(conversionInfo.targetUnitId);

                    if (!sourceUnit || !targetUnit) {
                        this.router.navigate(['/conversores/' + this.urlPrefix]);
                        return;
                    }

                    this.selectedSourceUnit = sourceUnit;
                    this.selectedTargetUnit = targetUnit;
                    this.updateTitle();
                    // this.gerarConversoesSugeridas();
                } else {
                    // Redireciona para a rota padrão se a conversão for inválida
                    this.router.navigate(['/conversores/' + this.urlPrefix]);
                }
            } else {
                // this.gerarConversoesSugeridas();
            }
        });
    }

    protected updateUrl(urlPrefix: string): void {
        const url = this.unitUrlFormatter.generateConversionUrl(
            this.selectedSourceUnit.id,
            this.selectedTargetUnit.id
        );

        // Update the URL without reloading the page
        this.router.navigate(['/conversores/' + urlPrefix + '/' + url], { replaceUrl: true });
    }

    protected updateTitle(): void {
        const unidadeOrigem = this.service.getUnitById(this.selectedSourceUnit.id);
        const unidadeDestino = this.service.getUnitById(this.selectedTargetUnit.id);

        if (unidadeOrigem && unidadeDestino) {
            this.setTitle(`Converter ${unidadeOrigem.name} para ${unidadeDestino.name}`);
            this.addDescription(`Ferramenta para converter ${unidadeOrigem.name} para ${unidadeDestino.name}. Cálculo instantâneo e preciso com explicação da fórmula de conversão.`);
            const conversionPath = this.unitUrlFormatter.generateConversionUrl(
                this.selectedSourceUnit.id,
                this.selectedTargetUnit.id
            );
            this.setCanonical(`/conversores/${this.urlPrefix}/${conversionPath}`);
        } else {
            this.setTitle('Conversor de Volume');
        }
    }

    protected updateFormula(): void {
        if (!this.sourceValue || this.sourceValue === '0') {
            this.showFormula = false;
            return;
        }

        const unidadeOrigem = this.service.getUnitById(this.selectedSourceUnit.id);
        const unidadeDestino = this.service.getUnitById(this.selectedTargetUnit.id);

        if (!unidadeOrigem || !unidadeDestino) return;

        // Formata os valores com pontos (caso tenha vírgulas)
        const valorOrigemNum = parseFloat(this.sourceValue.toString().replace('.', ','));
        const valorDestinoNum = parseFloat(this.targetValue.toString().replace('.', ','));

        if (isNaN(valorOrigemNum) || isNaN(valorDestinoNum)) return;

        // Obtém a unidade base do conversor atual
        const unidadeBase = this.service.getBaseUnit();
        if (!unidadeBase) return;

        // Gera a descrição da fórmula
        this.formulaDescription = `Para converter de ${unidadeOrigem.name} (${unidadeOrigem.symbol}) para ${unidadeDestino.name} (${unidadeDestino.symbol}):`;

        // Gera o cálculo detalhado e formatado
        if (unidadeOrigem.conversionFactor === unidadeDestino.conversionFactor) {
            this.formulaCalculation = `${this.sourceValue} ${unidadeOrigem.symbol} = ${this.targetValue} ${unidadeDestino.symbol}`;
        } else {
            // Versão detalhada da fórmula com melhor formatação e quebra de linhas
            const fatorOrigem = unidadeOrigem.conversionFactor || 1;
            const fatorDestino = unidadeDestino.conversionFactor || 1;
            const valorBaseCalc = valorOrigemNum * fatorOrigem;
            const valorBaseStr = valorBaseCalc.toString().replace('.', ',');

            this.formulaCalculation =
                `1. Converter ${this.sourceValue} ${unidadeOrigem.symbol} para ${unidadeBase.name} (unidade base):
                   ${this.sourceValue} × ${fatorOrigem} = ${valorBaseStr} ${unidadeBase.symbol}
                2. Converter ${valorBaseStr} ${unidadeBase.symbol} para ${unidadeDestino.name}:
                    ${valorBaseStr} ÷ ${fatorDestino} = ${this.targetValue} ${unidadeDestino.symbol}`;
        }

        this.showFormula = true;
    }

    protected onSourceUnitChange(unit: Unit): void {
        this.selectedSourceUnit = unit;
        this._afterUnitChanged();
    }

    protected onTargetUnitChange(unit: Unit): void {
        this.selectedTargetUnit = unit;
        this.updateUrl(this.urlPrefix);
        this._afterUnitChanged();
    }

    protected onValueChange(valores: CalculatorResult): void {
        this.sourceValue = valores.sourceValue;
        this.targetValue = valores.targetValue;
        this.updateFormula();
        this.showFormula = true;
    }

    // // Método para gerar conversões populares sugeridas
    // private gerarConversoesSugeridas(): void {
    //     // Combinações populares de conversão
    //     const conversoesFamosas = [
    //         { origem: 'grama', destino: 'quilograma' },
    //         { origem: 'quilograma', destino: 'grama' },
    //         { origem: 'quilograma', destino: 'libra' },
    //         { origem: 'libra', destino: 'quilograma' },
    //         { origem: 'grama', destino: 'onca' },
    //         { origem: 'onca', destino: 'grama' },
    //         { origem: 'quilograma', destino: 'tonelada-metrica' },
    //         { origem: 'tonelada-metrica', destino: 'quilograma' }
    //     ];

    //     this.conversoesSugeridas = conversoesFamosas.map(conv => {
    //         const unidadeOrigem = this.weightMassService.getUnitById(conv.origem);
    //         const unidadeDestino = this.weightMassService.getUnitById(conv.destino);
    //         const url = this.weightMassService.generateConversionUrl(conv.origem, conv.destino);

    //         return {
    //             nome: `${unidadeOrigem?.name} para ${unidadeDestino?.name}`,
    //             url: url
    //         };
    //     });
    // }
}