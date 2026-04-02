// src/converters/angle/angle.routes.ts
import { Routes } from '@angular/router';
import { AngleConverterHomePageComponent } from './pages/angle-converter-home-page/angle-converter-home-page.component';
import { AngleConverterPageComponent } from './pages/angle-converter-page/angle-converter-page.component';

export const ANGLE_ROUTES: Routes = [
    { path: '', component: AngleConverterHomePageComponent },
    { path: ':conversion', component: AngleConverterPageComponent }
];
