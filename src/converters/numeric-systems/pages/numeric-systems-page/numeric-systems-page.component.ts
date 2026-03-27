import { CommonModule } from '@angular/common';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NavigationHelper } from 'src/shared/helpers/navigationHelper';
import { PageBase } from 'src/shared/pages/pageBase';
import { UnitUrlFormatterService } from 'src/converters/shared/services/unit-url-formatter.service';
import { NUMERIC_SYSTEMS } from '../../numeric-systems.data';
import { NumericSystem } from '../../models/numeric-system.model';

@Component({
    selector: 'numeric-systems-page',
    standalone: true,
    imports: [
        RouterModule,
        CommonModule,
    ],
    templateUrl: './numeric-systems-page.component.html',
    styleUrl: './numeric-systems-page.component.scss'
})
export class NumericSystemsPageComponent extends PageBase implements OnInit, AfterViewInit {
    readonly systems: NumericSystem[] = NUMERIC_SYSTEMS;
    readonly groupedSystems: Array<{ key: NumericSystem, targets: NumericSystem[] }> = [];

    constructor(
        meta: Meta,
        title: Title,
        protected readonly unitUrlFormatterService: UnitUrlFormatterService,
    ) {
        super(meta, title);
        this._buildGroups();
    }

    private _buildGroups(): void {
        for (const source of this.systems) {
            const targets = this.systems.filter(s => s.id !== source.id);
            this.groupedSystems.push({ key: source, targets });
        }
    }

    ngOnInit(): void {
        const pageTitle = 'Conversor de Sistemas Numéricos';
        const description = 'Converta facilmente entre sistemas numéricos: binário, octal, decimal, hexadecimal e romano. Ferramenta precisa e instantânea.';
        const keywords = 'conversor sistemas numericos, binario para decimal, decimal para hexadecimal, hexadecimal para binario, numero romano, conversor octal, base 2, base 8, base 16';

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

    ngAfterViewInit(): void {
        NavigationHelper.setupAnchorNavigation();
        NavigationHelper.setupScrollWatch(400);
    }
}
