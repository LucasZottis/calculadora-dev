// src/app.routes.ts
import { Routes } from '@angular/router';
import { CnpjGeneratorPageComponent } from 'src/generators/cnpj/pages/cnpj-generator-page/cnpj-generator-page.component';
import { CpfGeneratorPageComponent } from 'src/generators/cpf/pages/cpf-generator-page/cpf-generator-page.component';
import { CnpjValidatorPageComponent } from 'src/validators/cnpj/pages/cnpj-validator-page/cnpj-validator-page.component';
import { CpfValidatorPageComponent } from 'src/validators/cpf/pages/cpf-validator-page/cpf-validator-page.component';
import { HomePageComponent } from './shared/pages/home-page/home-page.component';
import { PrivacyPolicyPageComponent } from './shared/pages/privacy-police-page/privacy-policy-page.component';
import { ValidatorsPageComponent } from './validators/shared/pages/validators-page/validators-page.component';
import { GeneratorsPageComponent } from './generators/shared/pages/generatos-page/generators-page.component';

export const routes: Routes = [
    {
        path: '',
        children: [
            { path: '', component: HomePageComponent },
            { path: 'politica-de-privacidade', component: PrivacyPolicyPageComponent },

            { path: 'validadores', component: ValidatorsPageComponent, },
            { path: 'validadores/cpf', component: CpfValidatorPageComponent, },
            { path: 'validadores/cnpj', component: CnpjValidatorPageComponent, },

            // Rotas para geradores
            { path: 'geradores', component: GeneratorsPageComponent },
            { path: 'geradores/cpf', component: CpfGeneratorPageComponent },
            { path: 'geradores/cnpj', component: CnpjGeneratorPageComponent },

        ]
    },
    // {
    //     path: 'conversores',
    //     children: [
    //         {
    //             path: 'volume',
    //             loadChildren: () => import('./converters/volume/volume.routes').then(m => m.VOLUME_ROUTES)
    //         },
    //         {
    //             path: 'tempo',
    //             loadChildren: () => import('./converters/time/time.routes').then(m => m.TIME_ROUTES)
    //         }
    //     ]
    // },
    // { path: '**', redirectTo: '' }
];