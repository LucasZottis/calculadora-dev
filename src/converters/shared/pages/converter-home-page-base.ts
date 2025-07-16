import { Meta, Title } from "@angular/platform-browser";
import { UnitConverterFactory, IUnitConverter, Unit } from "dev-toolz.library";
import { NavigationHelper } from "src/shared/helpers/navigationHelper";
import { PageBase } from "src/shared/pages/pageBase";
import { UnitUrlFormatterService } from '../services/unit-url-formatter.service';
import { inject } from "@angular/core";

export class ConverterHomePageBase extends PageBase {
    private readonly _service!: IUnitConverter;
    protected readonly unitUrlFormatterService: UnitUrlFormatterService = inject(UnitUrlFormatterService);
    protected readonly availableUnits: Unit[] = [];
    protected readonly groupedUnits: Array<{ key: Unit, units: Unit[] }> = [];

    constructor(
        factory: UnitConverterFactory,
        meta: Meta,
        title: Title,
        categoryId: string,
    ) {
        super(meta, title);
        this._service = factory.createService(categoryId);
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
        // const description = 'Converta facilmente entre diferentes unidades de volume como litros, mililitros, metros cúbicos, galões e muito mais. Calculadora precisa com explicações detalhadas.';
        // const pageTitle = 'Conversor de Volume - Todas as Unidades';

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
        // // const description = 'Converta facilmente entre diferentes unidades de peso e massa como quilogramas, gramas, libras, onças, toneladas e muito mais. Calculadora precisa com explicações detalhadas.';
        // // const pageTitle = 'Conversor de Peso e Massa - Todas as Unidades';

        // this.setTitle(pageTitle);
        // this.addDescription(pageDescription);

        // // Atualizar metadados para SEO
        // this.updateSeo({
        //     title: pageTitle,
        //     description: pageDescription,
        //     // keywords: 'conversor de peso, conversor de massa, quilogramas para gramas, libras para quilos, onças, conversão de peso, calculadora de massa corporal, toneladas, quilates'
        //     keywords: keyWords,
        // });

        // // Adicionar Schema.org para rich snippets
        // // this.addSchemaOrgData('SoftwareApplication', {
        // //     name: 'Conversor de Peso e Massa',
        // //     description: description,
        // //     applicationCategory: 'UtilityApplication',
        // //     operatingSystem: 'Web'
        // // });

        // this.addSchemaOrgData('SoftwareApplication', {
        //     name: pageTitle,
        //     description: pageDescription,
        //     applicationCategory: 'UtilityApplication',
        //     operatingSystem: 'Web'
        // });
    }

    protected navigationHelper() {
        // Configurar navegação por âncoras na página
        NavigationHelper.setupAnchorNavigation();
        // Configurar exibição da navegação rápida durante rolagem
        NavigationHelper.setupScrollWatch(400);
    }

    // ngAfterViewInit() {
    //     // Configurar navegação por âncoras na página
    //     NavigationHelper.setupAnchorNavigation();
    //     // Configurar exibição da navegação rápida durante rolagem
    //     NavigationHelper.setupScrollWatch(400);
    // }
}