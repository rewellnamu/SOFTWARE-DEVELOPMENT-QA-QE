// import { bootstrapApplication } from '@angular/platform-browser';
// import { appConfig } from './app/app.config';
// import { AppComponent } from './app/app.component';

// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));

import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouterModule } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
// Ensure the correct path to HomeComponent
// Ensure the correct path to HomeComponent
import { HomComponent } from './app/hom/hom.component';
import { AboutComponent } from './app/about/about.component';
import { ContactComponent } from './app/contact/contact.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      { path: '', component: HomComponent },
      { path: 'about', component: AboutComponent },
      { path: 'contact', component: ContactComponent },
    ]),
    importProvidersFrom(RouterModule),
  ],
});