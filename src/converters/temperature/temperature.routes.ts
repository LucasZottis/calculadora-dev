// src/converters/volume/volume.routes.ts
import { Routes } from '@angular/router';
import { TemperatureConverterHomePageComponent } from './pages/temperature-converter-home-page/temperature-converter-home-page.component';
import { TemperatureConverterPageComponent } from './pages/temperature-converter-page/temperature-converter-page.component';

export const TEMPERATURE_ROUTES: Routes = [
    { path: '', component: TemperatureConverterHomePageComponent },
    { path: ':conversion', component: TemperatureConverterPageComponent }
];