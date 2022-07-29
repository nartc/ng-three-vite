import './polyfills';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import hmrInit from '@angular-devkit/build-angular/src/webpack/plugins/hmr/hmr-accept';

import { AppComponent } from './app/app.component';

if (import.meta.env.PROD) {
  enableProdMode();
}

const routes: Routes = [];

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      RouterModule.forRoot(routes)
    )
  ]
});

// hmr support
if (import.meta.hot) {
  import.meta.hot.accept(() => {
    hmrInit(import.meta);
  });
}
