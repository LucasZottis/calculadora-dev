import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app.config';
import { MainLayoutComponent } from './shared/pages/main-layout/main-layout.component';

bootstrapApplication(MainLayoutComponent, appConfig)
  .catch((err) => console.error(err));
