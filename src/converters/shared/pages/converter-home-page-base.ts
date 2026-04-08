import { UnitConverterFactory, IUnitConverter, Unit } from "devtoolz-library";
import { NavigationHelper } from "src/shared/helpers/navigationHelper";
import { PageBase } from "src/shared/pages/pageBase";
import { UnitUrlFormatterService } from '../services/unit-url-formatter.service';
import { inject } from "@angular/core";
import { BreadcrumbItem } from "src/shared/models/breadcrumb-item";

export class ConverterHomePageBase extends PageBase {
    private readonly _service!: IUnitConverter;
    private readonly _factory: UnitConverterFactory = inject(UnitConverterFactory);
    protected readonly unitUrlFormatterService: UnitUrlFormatterService = inject(UnitUrlFormatterService);
    protected readonly availableUnits: Unit[] = [];
    protected readonly groupedUnits: Array<{ key: Unit, units: Unit[] }> = [];
    protected readonly categoryLabel: string;

    get breadcrumbItems(): BreadcrumbItem[] {
        return [
            { label: 'Início', link: '/' },
            { label: 'Conversores', link: '/conversores' },
            { label: this.categoryLabel },
        ];
    }

    constructor(
        categoryId: string,
        categoryLabel: string = '',
    ) {
        super();
        this.categoryLabel = categoryLabel;
        this._service = this._factory.createService(categoryId);
        this.availableUnits = this._service.getUnits();
        this._groupList();
    }

    private _groupList(): void {
        for (const unitKey of this.availableUnits) {
            const key = unitKey.id;

            for (const unit of this.availableUnits) {
                if (unit.id === key) {
                    continue; // Ignorar unidades iguais
                }

                // Verifica se o grupo já existe
                const existingGroup = this.groupedUnits.find(g => g.key.id === key);

                if (existingGroup) {
                    // Se o grupo já existe, adiciona a unidade
                    existingGroup.units.push(unit);
                } else {
                    // Se não existe, cria um novo grupo
                    this.groupedUnits.push({ key: unitKey, units: [unit] });
                }
            }
        }
    }

    private _setSEOInfo(
        pageDescription: string,
        pageTitle: string,
        keyWords: string
    ) {
        this.setTitle(pageTitle);
        this.addDescription(pageDescription);

        // Atualizar metadados para SEO
        this.updateSeo({
            title: pageTitle,
            description: pageDescription,
            keywords: keyWords
        });

        // Adicionar Schema.org para rich snippets
        this.addSchemaOrgData('SoftwareApplication', {
            name: pageTitle,
            description: pageDescription,
            applicationCategory: 'UtilityApplication',
            operatingSystem: 'Web'
        });
    }

    protected onInit(
        pageTitle: string,
        pageDescription: string,
        keyWords: string
    ): void {
        this._setSEOInfo(pageDescription, pageTitle, keyWords);
    }

    protected navigationHelper() {
        // Configurar navegação por âncoras na página
        NavigationHelper.setupAnchorNavigation();

        // Configurar exibição da navegação rápida durante rolagem
        NavigationHelper.setupScrollWatch(400);
    }
}