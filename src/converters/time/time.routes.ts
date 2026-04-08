import { Routes } from '@angular/router';
import { TimeConverterHomePageComponent } from './pages/time-converter-home-page/time-converter-home-page.component';
import { TimeConverterPageComponent } from './pages/time-converter-page/time-converter-page.component';

export const TIME_ROUTES: Routes = [
  { path: '', component: TimeConverterHomePageComponent },
  { path: ':conversion', component: TimeConverterPageComponent },
];
