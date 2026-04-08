import { Routes } from '@angular/router';
import { CsvJsonHomePageComponent } from './pages/csv-json-home-page/csv-json-home-page.component';
import { CsvToJsonPageComponent } from './pages/csv-to-json-page/csv-to-json-page.component';
import { JsonToCsvPageComponent } from './pages/json-to-csv-page/json-to-csv-page.component';

export const CSV_JSON_ROUTES: Routes = [
    { path: '', component: CsvJsonHomePageComponent },
    { path: 'csv-para-json', component: CsvToJsonPageComponent },
    { path: 'json-para-csv', component: JsonToCsvPageComponent },
];
