import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { VolumeConverterService } from 'src/converters/volume/services/volume-converter/volume-converter.service';
import { routes } from './app.routes';
import { WeightMassConverterService } from './converters/weight-and-mass/services/weight-mass/weight-mass-converter.service';
import { provideConverters } from './converters/shared/provider';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // Registrar conversores adicionais
    provideConverters([
      {
        categoryId: 'volume',
        categoryName: 'Volume',
        categoryIcon: 'deployed_code',
      },
      {
        categoryId: 'peso-e-massa',
        categoryName: 'Peso e Massa',
        categoryIcon: 'weight',
      }
      // Adicione mais conversores aqui conforme necessário
    ])
  ]
};
