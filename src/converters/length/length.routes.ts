// src/converters/volume/volume.routes.ts
import { Routes } from '@angular/router';
import { LengthConverterHomePageComponent } from './pages/length-converter-home-page/length-converter-home-page.component';
import { LengthConverterPageComponent } from './pages/length-converter-page/length-converter-page.component';

export const LENGTH_ROUTES: Routes = [
    { path: '', component: LengthConverterHomePageComponent },
    { path: ':conversion', component: LengthConverterPageComponent }
];