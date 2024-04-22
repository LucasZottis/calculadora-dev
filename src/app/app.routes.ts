import { Routes } from '@angular/router';
import { HomePageComponent } from 'src/pages/home-page/home-page.component';
import { TimeConverterPageComponent } from 'src/pages/time-converter-page/time-converter-page.component';

export const routes: Routes = [
    {path: '', component: HomePageComponent},
    {path: 'conversores/conversor-tempo', component: TimeConverterPageComponent}
];
