import { Inject, Injectable, Injector, Optional } from '@angular/core';
import { IConverterService } from 'src/converters/shared/interfaces/IConverterService';
import { CalculatorCategory } from 'src/converters/shared/models/calculatorCategory';
import { ConverterRegistration } from 'src/converters/shared/models/converterRegistration';
import { ADDITIONAL_CONVERTERS } from 'src/converters/provider';
import { VolumeConverterService } from '../../../volume/services/volume-converter/volume-converter.service';

@Injectable({
  providedIn: 'root'
})
export class ConverterFactoryService {
  private categories: CalculatorCategory[] = [];

  // Mapa para armazenar referências de serviços
  private serviceMap: Map<string, IConverterService> = new Map();

  constructor(
    private injector: Injector,
    @Optional() @Inject(ADDITIONAL_CONVERTERS) private additionalConverters?: ConverterRegistration[]
  ) {
    // Registrar categoria de volume por padrão
    this.categories.push({
      id: 'volume',
      name: 'Volume',
      icon: 'water_full'
    });

    // Registrar conversores adicionais
    this.registerAdditionalConverters();
  }

  private registerAdditionalConverters(): void {
    if (!this.additionalConverters) return;

    for (const converter of this.additionalConverters) {
      // Adiciona a categoria se ainda não existir
      if (!this.categories.some(cat => cat.id === converter.categoryId)) {
        this.categories.push({
          id: converter.categoryId,
          name: converter.categoryName,
          icon: converter.categoryIcon
        });
      }

      // Em uma abordagem standalone, os serviços precisam ser injetados individualmente
      // Este é apenas um exemplo básico - na prática você precisaria injetar os serviços apropriadamente
      console.log(`Registrada categoria: ${converter.categoryId}`);
    }
  }

  /**
   * Retorna todas as categorias de conversão disponíveis
   */
  getCategories(): CalculatorCategory[] {
    return this.categories;
  }

  /**
   * Retorna a categoria pelo ID
   * @param categoryId ID da categoria
   */
  getCategoryById(categoryId: string): CalculatorCategory | undefined {
    return this.categories.find(cat => cat.id === categoryId);
  }

  /**
  * Retorna o serviço de conversão adequado para a categoria especificada
  * @param categoryId ID da categoria
  */
  getConverterService(categoryId: string): IConverterService {
    // Verificar no mapa de serviços
    const service = this.serviceMap.get(categoryId);
    if (service) {
      return service;
    }

    // Fallback para o switch case
    switch (categoryId) {
      case 'volume':
        // Injetar o serviço dinamicamente
        return this.injector.get(VolumeConverterService);
      // case 'tempo':
      //   return this.timeService;
      // case 'comprimento':
      //   return this.lengthService;
      // case 'peso':
      //   return this.weightService;
      // case 'area':
      //   return this.areaService;
      default:
        throw new Error(`Categoria não suportada: ${categoryId}`);
    }
  }

  /**
   * Registra uma nova categoria e seu serviço de conversão
   * @param category Nova categoria
   * @param service Serviço de conversão
   */
  registerConverter(category: CalculatorCategory, service: IConverterService): void {
    // Verificar se a categoria já existe
    if (this.categories.some(cat => cat.id === category.id)) {
      console.warn(`Categoria já registrada: ${category.id}. Atualizando o serviço.`);
    } else {
      // Adicionar categoria
      this.categories.push(category);
    }

    // Registrar ou atualizar serviço
    this.serviceMap.set(category.id, service);
  }
}