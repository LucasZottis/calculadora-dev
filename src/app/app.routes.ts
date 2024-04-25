import { Routes } from '@angular/router';
import { HomePageComponent } from 'src/pages/home-page/home-page.component';
import { TimeConverterPageComponent } from 'src/pages/time-converter-page/time-converter-page.component';
import { CnpjValidatorPageComponent } from 'src/pages/validators/cnpj-validator-page/cnpj-validator-page.component';
import {    CpfValidatorPageComponent } from 'src/pages/validators/cpf-validator-page/cpf-validator-page.component';

export const routes: Routes = [
    {path: '', component: HomePageComponent},
    {path: 'conversores/conversor-tempo', component: TimeConverterPageComponent},
    {path: 'validadores/cpf', component: CpfValidatorPageComponent},
    {path: 'validadores/cnpj', component: CnpjValidatorPageComponent},
];
