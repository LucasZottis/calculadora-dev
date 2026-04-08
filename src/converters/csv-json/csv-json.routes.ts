import { Routes } from '@angular/router';
import { CsvJsonHomePageComponent } from './pages/csv-json-home-page/csv-json-home-page.component';
import { CsvJsonConverterPageComponent } from './pages/csv-json-converter-page/csv-json-converter-page.component';

export const CSV_JSON_ROUTES: Routes = [
    { path: '', component: CsvJsonHomePageComponent },
    { path: ':conversion', component: CsvJsonConverterPageComponent },
];
