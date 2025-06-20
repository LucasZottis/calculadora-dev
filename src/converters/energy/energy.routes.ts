// src/converters/volume/volume.routes.ts
import { Routes } from '@angular/router';
import { EnergyHomePageComponent } from './pages/energy-home-page/energy-home-page.component';
import { EnergyConverterPageComponent } from './pages/energy-converter-page/energy-converter-page.component';

export const ENERGY_ROUTES: Routes = [
    { path: '', component: EnergyHomePageComponent },
    { path: ':conversion', component: EnergyConverterPageComponent }
];