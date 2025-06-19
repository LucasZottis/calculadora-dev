// src/converters/shared/services/converter-url/converter-url.service.ts
import { Injectable } from '@angular/core';
import { Unit } from 'dev-toolz.library';

@Injectable({
    providedIn: 'root'
})
export class ConverterUrlService {

    // Método para formatar as unidades em formato de URL
    formatUnitToUrl(unit: Unit): string {
        return unit.name
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '') // Remove acentos
            .replace(/[^\w\s-]/g, '') // Remove caracteres especiais
            .replace(/\s+/g, '-'); // Substitui espaços por hifens
    }

    generateConversionUrl(sourceUnit: Unit, targetUnit: Unit): string {
        const sourceUrlPart = this.formatUnitToUrl(sourceUnit);
        const targetUrlPart = this.formatUnitToUrl(targetUnit);
        return `${sourceUrlPart}-para-${targetUrlPart}`;
    }

    // Método para encontrar unidade a partir da URL
    findUnitByUrlPart(units: Unit[], urlPart: string): Unit | undefined {
        // Primeiro tenta encontrar correspondência exata
        const directMatch = units.find(unit =>
            this.formatUnitToUrl(unit) === urlPart
        );

        if (directMatch) return directMatch;

        // Se não encontrar, tenta correspondências mais flexíveis
        return units.find(unit => {
            const unitUrlFormat = this.formatUnitToUrl(unit);
            return urlPart.includes(unitUrlFormat) || unitUrlFormat.includes(urlPart);
        });
    }

    // Parse da URL de conversão
    parseConversionUrl(units: Unit[], url: string): { sourceUnit: Unit, targetUnit: Unit } | undefined {
        const parts = url.split('-para-');
        if (parts.length !== 2) return undefined;

        const sourceUnit = this.findUnitByUrlPart(units, parts[0]);
        const targetUnit = this.findUnitByUrlPart(units, parts[1]);

        if (!sourceUnit || !targetUnit) return undefined;

        return { sourceUnit, targetUnit };
    }
}