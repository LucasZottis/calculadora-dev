import { Routes } from '@angular/router';
import { AreaHomePageComponent } from './pages/area-home-page/area-home-page.component';
import { AreaConverterPageComponent } from './pages/area-converter-page/area-converter-page.component';

export const AREA_ROUTES: Routes = [
    { path: '', component: AreaHomePageComponent },
    { path: ':conversion', component: AreaConverterPageComponent }
];