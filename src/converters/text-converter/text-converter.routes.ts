import { Routes } from '@angular/router';
import { TextConverterHomePageComponent } from './pages/text-converter-home-page/text-converter-home-page.component';
import { TextConverterPageComponent } from './pages/text-converter-page/text-converter-page.component';

export const TEXT_CONVERTER_HOME_ROUTES: Routes = [
    { path: '', component: TextConverterHomePageComponent },
];

export const TEXT_CONVERTER_BINARY_ROUTES: Routes = [
    { path: '', component: TextConverterPageComponent, data: { format: 'binary' } },
];

export const TEXT_CONVERTER_MORSE_ROUTES: Routes = [
    { path: '', component: TextConverterPageComponent, data: { format: 'morse' } },
];
