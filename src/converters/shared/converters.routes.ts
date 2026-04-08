// src/converters/volume/volume.routes.ts
import { Routes } from '@angular/router';
import { ConvertersPageComponent } from './pages/converters-page/converters-page.component';

export const CONVERTERS_ROUTES: Routes = [
    { path: '', component: ConvertersPageComponent },
    { path: 'volume', loadChildren: () => import('../volume/volume.routes').then(m => m.VOLUME_ROUTES) },
    { path: 'peso-e-massa', loadChildren: () => import('../weight-and-mass/weight-mass.routes').then(m => m.WEIGHT_MASS_ROUTES) },
    { path: 'comprimento', loadChildren: () => import('../length/length.routes').then(m => m.LENGTH_ROUTES) },
    { path: 'temperatura', loadChildren: () => import('../temperature/temperature.routes').then(m => m.TEMPERATURE_ROUTES) },
    { path: 'energia', loadChildren: () => import('../energy/energy.routes').then(m => m.ENERGY_ROUTES) },
    { path: 'area', loadChildren: () => import('../area/area.routes').then(m => m.AREA_ROUTES) },
    { path: 'tempo', loadChildren: () => import('../time/time.routes').then(m => m.TIME_ROUTES) },
    { path: 'tempo-decimal', loadChildren: () => import('../decimal-time/decimal-time.routes').then(m => m.DECIMAL_TIME_ROUTES) },
    { path: 'dados', loadChildren: () => import('../data/data.routes').then(m => m.DATA_ROUTES) },
    { path: 'sistemas-numericos', loadChildren: () => import('../numeric-systems/numeric-systems.routes').then(m => m.NUMERIC_SYSTEMS_ROUTES) },
    { path: 'texto', loadChildren: () => import('../text-converter/text-converter.routes').then(m => m.TEXT_CONVERTER_ROUTES) },
    { path: 'angulo', loadChildren: () => import('../angle/angle.routes').then(m => m.ANGLE_ROUTES) },
    { path: 'pressao', loadChildren: () => import('../pressure/pressure.routes').then(m => m.PRESSURE_ROUTES) },
    { path: 'velocidade', loadChildren: () => import('../speed/speed.routes').then(m => m.SPEED_ROUTES) },
    { path: 'potencia', loadChildren: () => import('../power/power.routes').then(m => m.POWER_ROUTES) },
    { path: 'csv-json', loadChildren: () => import('../csv-json/csv-json.routes').then(m => m.CSV_JSON_ROUTES) },
];