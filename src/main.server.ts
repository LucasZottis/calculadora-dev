import { bootstrapApplication } from '@angular/platform-browser';
import { MainLayoutComponent } from './shared/pages/main-layout/main-layout.component';
import { config } from './app/app.config.server';

const bootstrap = () => bootstrapApplication(MainLayoutComponent, config);

export default bootstrap;
