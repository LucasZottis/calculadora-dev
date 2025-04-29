// src/shared/pages/main-layout/main-layout.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { FooterComponent } from 'src/shared/components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { CookieConsentComponent } from '../../components/cookie-consent/cookie-consent.component';

@Component({
  selector: 'main-layout',
  standalone: true,
  imports: [
    RouterModule,
    RouterOutlet,
    CommonModule,
    FooterComponent,
    HeaderComponent,
    CookieConsentComponent
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})

export class MainLayoutComponent {

}