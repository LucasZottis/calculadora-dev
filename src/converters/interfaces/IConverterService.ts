// src/converters/services/converter.service.interface.ts

import { CalculatorUnit } from 'src/converters/models/calculatorUnit';

export interface IConverterService {
    /**
     * Retorna as unidades disponíveis para esta categoria
     */
    getUnits(): CalculatorUnit[];

    /**
     * Converte um valor da unidade de origem para a unidade de destino
     * @param value Valor a ser convertido
     * @param sourceUnitId ID da unidade de origem
     * @param targetUnitId ID da unidade de destino
     */
    convert(value: number, sourceUnitId: string, targetUnitId: string): number;

    /**
     * Retorna a unidade pelo ID
     * @param unitId ID da unidade
     */
    getUnitById(unitId: string): CalculatorUnit | undefined;
}