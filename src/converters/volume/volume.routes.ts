// src/converters/volume/volume.routes.ts

import { Routes } from '@angular/router';
import { VolumeConverterPageComponent } from './pages/volume-converter-page/volume-converter-page.component';
import { VolumeLayoutComponent } from './pages/volume-layout/volume-layout.component';
import { VolumeHomePageComponent } from './pages/volume-home-page/volume-home-page.component';

export const VOLUME_ROUTES: Routes = [
    {
        path: '',
        component: VolumeLayoutComponent,
        children: [
            { path: '', component: VolumeHomePageComponent },
            { path: ':conversion', component: VolumeConverterPageComponent }
        ]
    }
];