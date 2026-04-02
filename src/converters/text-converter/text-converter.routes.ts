import { Routes } from '@angular/router';
import { TextConverterPageComponent } from './pages/text-converter-page/text-converter-page.component';

export const TEXT_CONVERTER_BINARY_ROUTES: Routes = [
    { path: '', component: TextConverterPageComponent, data: { format: 'binary' } },
];

export const TEXT_CONVERTER_MORSE_ROUTES: Routes = [
    { path: '', component: TextConverterPageComponent, data: { format: 'morse' } },
];
