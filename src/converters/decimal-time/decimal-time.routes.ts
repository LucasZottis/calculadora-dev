// src/converters/volume/volume.routes.ts
import { Routes } from '@angular/router';
import { DecimalTimeConverterPageComponent } from './pages/decimal-time-converter-page/decimal-time-converter-page.component';

export const DECIMAL_TIME_ROUTES: Routes = [
    { path: '', component: DecimalTimeConverterPageComponent },
];