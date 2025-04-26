import { InjectionToken } from "@angular/core";
import { ConverterRegistration } from "./shared/models/converterRegistration";

export const ADDITIONAL_CONVERTERS = new InjectionToken<ConverterRegistration[]>('ADDITIONAL_CONVERTERS');

// Função para prover conversores adicionais
export function provideConverters(additionalConverters: ConverterRegistration[] = []) {
    return [
        { provide: ADDITIONAL_CONVERTERS, useValue: additionalConverters }
    ];
}