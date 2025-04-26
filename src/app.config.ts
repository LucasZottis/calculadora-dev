import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideConverters } from 'src/converters/provider';
import { VolumeConverterService } from 'src/converters/services/volume-converter/volume-converter.service';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // Registrar conversores adicionais
    provideConverters([
      {
        categoryId: 'volume',
        categoryName: 'Volume',
        categoryIcon: 'deployed_code',
        serviceType: VolumeConverterService
      }
      // Adicione mais conversores aqui conforme necessário
    ])
  ]
};
