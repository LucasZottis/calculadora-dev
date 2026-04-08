import { Routes } from '@angular/router';
import { SerializationHomePageComponent } from './pages/serialization-home-page/serialization-home-page.component';
import { SerializationConverterPageComponent } from './pages/serialization-converter-page/serialization-converter-page.component';

export const SERIALIZATION_ROUTES: Routes = [
    { path: '', component: SerializationHomePageComponent },
    { path: ':conversion', component: SerializationConverterPageComponent },
];
