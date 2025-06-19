import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CookieConsentComponent } from 'src/shared/components/cookie-consent/cookie-consent.component';

@Component({
  selector: 'app',
  standalone: true,
  imports: [RouterOutlet, CookieConsentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

}
