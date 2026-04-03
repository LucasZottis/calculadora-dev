import { Routes } from '@angular/router';
import { TextConverterHomePageComponent } from './pages/text-converter-home-page/text-converter-home-page.component';
import { TextConverterPageComponent } from './pages/text-converter-page/text-converter-page.component';

export const TEXT_CONVERTER_ROUTES: Routes = [
    { path: '', component: TextConverterHomePageComponent },
    { path: ':conversion', component: TextConverterPageComponent },
];
