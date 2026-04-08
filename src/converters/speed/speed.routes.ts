import { Routes } from '@angular/router';
import { SpeedConverterHomePageComponent } from './pages/speed-converter-home-page/speed-converter-home-page.component';
import { SpeedConverterPageComponent } from './pages/speed-converter-page/speed-converter-page.component';

export const SPEED_ROUTES: Routes = [
    { path: '', component: SpeedConverterHomePageComponent },
    { path: ':conversion', component: SpeedConverterPageComponent }
];
