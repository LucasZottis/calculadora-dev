import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { UnitConverterFactory } from 'devtoolz-library';
import { provideClientHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    UnitConverterFactory, provideClientHydration(),
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
