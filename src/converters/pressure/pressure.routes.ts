import { Routes } from '@angular/router';
import { PressureHomePageComponent } from './pages/pressure-home-page/pressure-home-page.component';
import { PressureConverterPageComponent } from './pages/pressure-converter-page/pressure-converter-page.component';

export const PRESSURE_ROUTES: Routes = [
    { path: '', component: PressureHomePageComponent },
    { path: ':conversion', component: PressureConverterPageComponent }
];
