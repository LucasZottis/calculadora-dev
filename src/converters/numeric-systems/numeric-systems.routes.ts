import { Routes } from '@angular/router';
import { NumericSystemsPageComponent } from './pages/numeric-systems-page/numeric-systems-page.component';
import { NumericSystemsConverterPageComponent } from './pages/numeric-systems-converter-page/numeric-systems-converter-page.component';

export const NUMERIC_SYSTEMS_ROUTES: Routes = [
    { path: '', component: NumericSystemsPageComponent },
    { path: ':conversion', component: NumericSystemsConverterPageComponent },
];
