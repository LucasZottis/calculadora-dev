import { Routes } from '@angular/router';
import { PowerConverterHomePageComponent } from './pages/power-converter-home-page/power-converter-home-page.component';
import { PowerConverterPageComponent } from './pages/power-converter-page/power-converter-page.component';

export const POWER_ROUTES: Routes = [
    { path: '', component: PowerConverterHomePageComponent },
    { path: ':conversion', component: PowerConverterPageComponent }
];
