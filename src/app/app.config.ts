import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideConverters } from 'src/converters/provider';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // Registrar conversores adicionais
    provideConverters([
      // {
      //   categoryId: 'temperatura',
      //   categoryName: 'Temperatura',
      //   categoryIcon: 'device_thermostat',
      //   serviceType: TemperatureConverterService
      // }
      // Adicione mais conversores aqui conforme necessário
    ])
  ]
};
