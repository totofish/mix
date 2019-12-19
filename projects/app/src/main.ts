import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AngularModule } from './angular/angular.module';
import { environment } from './environments/environment';

import { VueApp } from './vue';
import { ReactApp } from './react';

// Angular
if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AngularModule)
  .catch(err => console.error(err));


// Run Vue App
VueApp();

// Run React App
ReactApp();
