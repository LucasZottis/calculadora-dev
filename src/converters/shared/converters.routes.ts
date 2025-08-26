// src/converters/volume/volume.routes.ts
import { Routes } from '@angular/router';
import { ConvertersPageComponent } from './pages/converters-page/converters-page.component';
import { DATA_ROUTES } from '../data/data.routes';

export const CONVERTERS_ROUTES: Routes = [
    { path: '', component: ConvertersPageComponent },
    { path: 'volume', loadChildren: () => import('../volume/volume.routes').then(m => m.VOLUME_ROUTES) },
    { path: 'peso-e-massa', loadChildren: () => import('../weight-and-mass/weight-mass.routes').then(m => m.WEIGHT_MASS_ROUTES) },
    { path: 'comprimento', loadChildren: () => import('../length/length.routes').then(m => m.LENGTH_ROUTES) },
    { path: 'temperatura', loadChildren: () => import('../temperature/temperature.routes').then(m => m.TEMPERATURE_ROUTES) },
    { path: 'energia', loadChildren: () => import('../energy/energy.routes').then(m => m.ENERGY_ROUTES) },
    { path: 'area', loadChildren: () => import('../area/area.routes').then(m => m.AREA_ROUTES) },
    { path: 'tempo-decimal', loadChildren: () => import('../decimal-time/decimal-time.routes').then(m => m.DECIMAL_TIME_ROUTES) },
    { path: 'dados', loadChildren: () => import('../data/data.routes').then(m => m.DATA_ROUTES) },
];