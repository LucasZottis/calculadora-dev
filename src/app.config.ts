import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideConverters } from 'src/converters/provider';
import { VolumeConverterService } from 'src/converters/volume/services/volume-converter/volume-converter.service';
import { routes } from './app.routes';
import { WeightMassConverterService } from './converters/weight-and-mass/services/weight-mass/weight-mass-converter.service';

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
      },
      {
        categoryId: 'peso-massa',
        categoryName: 'Peso e Massa',
        categoryIcon: 'monitor_weight',
        serviceType: WeightMassConverterService
      }
      // Adicione mais conversores aqui conforme necessário
    ])
  ]
};
