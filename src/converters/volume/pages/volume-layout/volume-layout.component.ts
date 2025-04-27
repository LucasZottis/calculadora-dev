import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VolumeConverterMenuComponent } from '../../components/volume-converter-menu/volume-converter-menu.component';
import { CookieConsentComponent } from 'src/shared/components/cookie-consent/cookie-consent.component';
import { FooterComponent } from 'src/shared/components/footer/footer.component';

@Component({
  selector: 'volume-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    VolumeConverterMenuComponent,
    CookieConsentComponent,
    FooterComponent
  ],
  templateUrl: './volume-layout.component.html',
  styleUrl: './volume-layout.component.scss'
})
export class VolumeLayoutComponent {
  sidebarExpanded: boolean = false;
  sidebarStyle = 'sidebar';

  toggleSidebar(): void {
    this.sidebarExpanded = !this.sidebarExpanded;
    this.sidebarStyle = this.sidebarExpanded ? 'sidebar expanded' : 'sidebar';
  }
}