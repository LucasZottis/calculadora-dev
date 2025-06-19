import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UnitUrlFormatterService {
  // Método para formatar as unidades em formato de URL
  // getUnitForUrl(id: string): string {
  //     const unit = this.getUnitById(id);
  //     if (!unit)
  //         return id;

  //     return unit.name
  //         .toLowerCase()
  //         .normalize('NFD')
  //         .replace(/[\u0300-\u036f]/g, '') // Remove acentos
  //         .replace(/[^\w\s-]/g, '') // Remove caracteres especiais
  //         .replace(/\s+/g, '-'); // Substitui espaços por hifens
  // }

  // Método para obter o ID da unidade a partir da URL
  // getUnitIdFromUrl(urlPart: string): string | undefined {
  //     // Primeiro tenta encontrar uma correspondência direta
  //     const directMatch = this.units.find(unit => this.getUnitForUrl(unit.id) === urlPart);
  //     if (directMatch) return directMatch.id;

  //     // Se não encontrar, tenta correspondências mais flexíveis
  //     for (const unit of this.units) {
  //         const unitUrlFormat = this.getUnitForUrl(unit.id);
  //         // Compara ignorando hifens, plurais etc.
  //         if (urlPart.includes(unitUrlFormat) || unitUrlFormat.includes(urlPart)) {
  //             return unit.id;
  //         }
  //     }

  //     return undefined;
  // }

  // Método para auxiliar a converter entre a URL e os IDs das unidades
  parseConversionUrl(url: string): { sourceUnitId: string, targetUnitId: string } | undefined {
    // Formato esperado: unidade-origem-para-unidade-destino
    const parts = url.split('-para-');

    if (parts.length !== 2)
      return undefined;

    const sourceUnitId = parts[0];
    const targetUnitId = parts[1];

    if (!sourceUnitId || !targetUnitId)
      return undefined;

    return { sourceUnitId, targetUnitId };
  }

  // Método para auxiliar a gerar a URL a partir dos IDs das unidades
  generateConversionUrl(sourceUnitId: string, targetUnitId: string): string {
    // const sourceUrlPart = this.getUnitForUrl(sourceUnitId);
    // const targetUrlPart = this.getUnitForUrl(targetUnitId);

    return `${sourceUnitId}-para-${targetUnitId}`;
  }
}
