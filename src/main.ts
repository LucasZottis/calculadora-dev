import { bootstrapApplication } from '@angular/platform-browser';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { appConfig } from './app.config';

bootstrapApplication(MainLayoutComponent, appConfig)
  .catch((err) => console.error(err));
