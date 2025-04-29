// src/converters/volume/volume.routes.ts
import { Routes } from '@angular/router';
import { VolumeConverterPageComponent } from './pages/volume-converter-page/volume-converter-page.component';
import { VolumePageComponent } from './pages/volume-home-page/volume-page/volume-page.component';

export const VOLUME_ROUTES: Routes = [
    { path: '', component: VolumePageComponent },
    { path: ':conversion', component: VolumeConverterPageComponent }
];