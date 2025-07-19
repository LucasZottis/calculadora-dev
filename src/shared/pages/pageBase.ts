// src/shared/pages/pageBase.ts
import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";
import { SeoService } from "../services/seoService/seo.service";

@Component({
    selector: 'page-base',
    standalone: true,
    imports: [],
    template: '',
})
export class PageBase implements OnDestroy {
    private _meta: Meta;
    private _title: Title;
    private _seoService: SeoService;

    constructor(meta?: Meta, title?: Title) {
        this._meta = meta || inject(Meta);
        this._title = title || inject(Title);
        this._seoService = inject(SeoService);
    }

    protected setTitle(title: string): void {
        this._title.setTitle(title + " - Calculadora Dev");
    }

    protected addDescription(description: string): void {
        this._meta.addTag({
            name: "description",
            content: description,
        });
    }

    protected updateSeo(config: {
        title?: string;
        description?: string;
        keywords?: string;
        image?: string;
        url?: string;
        type?: string;
    }): void {
        this._seoService.updateTags(config);
    }

    protected addSchemaOrgData(type: string, data: any): void {
        this._seoService.addSchema(type, data);
    }

    ngOnDestroy(): void {
        this._meta.removeTag("name='description'");
    }
}