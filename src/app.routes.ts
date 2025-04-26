import { Routes } from '@angular/router';
import { CnpjGeneratorPageComponent } from 'src/generators/cnpj/pages/cnpj-generator-page/cnpj-generator-page.component';
import { CpfGeneratorPageComponent } from 'src/generators/cpf/pages/cpf-generator-page/cpf-generator-page.component';
import { CnpjValidatorPageComponent } from 'src/validators/cnpj/pages/cnpj-validator-page/cnpj-validator-page.component';
import { CpfValidatorPageComponent } from 'src/validators/cpf/pages/cpf-validator-page/cpf-validator-page.component';
import { HomePageComponent } from './shared/pages/home-page/home-page.component';
import { PrivacyPolicyPageComponent } from './shared/pages/privacy-police-page/privacy-policy-page.component';
import { MainLayoutComponent } from './shared/pages/main-layout/main-layout.component';

export const routes: Routes = [
    // { path: '', component: HomePageComponent },
    // { path: 'conversores/conversor-tempo', component: TimeConverterPageComponent },

    // // Novas rotas para o conversor de volume
    // // { path: 'conversores/volume', component: VolumeConverterPageComponent },
    // { path: 'conversores/volume/:conversion', component: VolumeConverterPageComponent },

    // // Rotas para o conversor de peso e massa
    // // { path: 'conversores/peso-massa', component: WeightMassConverterPageComponent },
    // { path: 'conversores/peso-massa/:conversion', component: WeightMassConverterPageComponent },

    // { path: 'validadores/cpf', component: CpfValidatorPageComponent },
    // { path: 'validadores/cnpj', component: CnpjValidatorPageComponent },

    // { path: 'geradores/cpf', component: CpfGeneratorPageComponent },
    // { path: 'geradores/cnpj', component: CnpjGeneratorPageComponent },

    // { path: 'politica-de-privacidade', component: PrivacyPolicyPageComponent },

    {
        path: '',
        component: MainLayoutComponent,
        children: [
            { path: '', component: HomePageComponent },
            { path: 'validadores/cpf', component: CpfValidatorPageComponent },
            { path: 'validadores/cnpj', component: CnpjValidatorPageComponent },
            { path: 'geradores/cpf', component: CpfGeneratorPageComponent },
            { path: 'geradores/cnpj', component: CnpjGeneratorPageComponent },
            { path: 'politica-de-privacidade', component: PrivacyPolicyPageComponent },
        ]
    },
    {
        path: 'conversores',
        children: [
            {
                path: 'volume',
                loadChildren: () => import('./converters/volume/volume.routes').then(m => m.VOLUME_ROUTES)
            },
            // {
            //     path: 'peso-e-massa',
            //     loadChildren: () => import('./converters/weight-and-mass/weight-mass.routes').then(m => m.WEIGHT_MASS_ROUTES)
            // },
            // {
            //     path: 'tempo',
            //     loadChildren: () => import('./converters/time/time.routes').then(m => m.TIME_ROUTES)
            // }
        ]
    },
    { path: '**', redirectTo: '' }
];