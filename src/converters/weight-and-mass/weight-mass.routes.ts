// src/converters/weight-mass/weight-mass.routes.ts
import { Routes } from '@angular/router';
import { WeightMassConverterPageComponent } from './pages/weight-mass-converter-page/weight-mass-converter-page.component';
import { WeightMassPageComponent } from './pages/weight-mass-page/weight-mass-page.component';

export const WEIGHT_MASS_ROUTES: Routes = [
    { path: '', component: WeightMassPageComponent },
    { path: ':conversion', component: WeightMassConverterPageComponent }
];