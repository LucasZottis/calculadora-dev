import { Routes } from '@angular/router';
import { DataHomePageComponent } from './pages/data-home-page/data-home-page.component';
import { DataConverterPageComponent } from './pages/data-converter-page/data-converter-page.component';

export const DATA_ROUTES: Routes = [
    { path: '', component: DataHomePageComponent },
    { path: ':conversion', component: DataConverterPageComponent }
];