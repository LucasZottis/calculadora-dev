import { Inject, Injectable, Injector, Optional } from '@angular/core';
import { ConverterRegistration } from '../../models/converterRegistration';
import { ADDITIONAL_CONVERTERS } from '../../provider';
import { ConverterCategory } from '../../models/converterCategory';

// @Injectable({
//   providedIn: 'root'
// })
export class ConvertersBaseService {
  private _selectedCategory: string = 'volume';
  private _converters: ConverterCategory[] = [];

  constructor(
    // private injector: Injector,
    category: string,
    @Optional() @Inject(ADDITIONAL_CONVERTERS) private converters?: ConverterRegistration[]
  ) {
    // Registrar conversores adicionais
    this.registerCategories();
    this._selectedCategory = category;
  }

  private registerCategories(): void {
    if (!this.converters) return;

    for (const converter of this.converters) {
      // Adiciona a categoria se ainda não existir
      if (!this._converters.some(cat => cat.id === converter.categoryId)) {
        this._converters.push({
          id: converter.categoryId,
          name: converter.categoryName,
          icon: converter.categoryIcon
        });
      }
    }
  }
}
