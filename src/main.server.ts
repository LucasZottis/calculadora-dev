import { bootstrapApplication, BootstrapContext } from '@angular/platform-browser';
import { MainLayoutComponent } from './shared/pages/main-layout/main-layout.component';
import { config } from './app/app.config.server';

const bootstrap = (context?: BootstrapContext) => bootstrapApplication(MainLayoutComponent, config, context);

export default bootstrap;
