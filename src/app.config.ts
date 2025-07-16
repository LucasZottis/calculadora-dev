import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { UnitConverterFactory } from 'dev-toolz.library';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    UnitConverterFactory,
    // Registrar conversores adicionais
    // provideConverters([
    //   {
    //     categoryId: 'volume',
    //     categoryName: 'Volume',
    //     categoryIcon: 'deployed_code',
    //   },
    //   {
    //     categoryId: 'peso-e-massa',
    //     categoryName: 'Peso e Massa',
    //     categoryIcon: 'weight',
    //   }
    //   // Adicione mais conversores aqui conforme necessário
    // ])
  ]
};
