// import { bootstrapApplication } from '@angular/platform-browser';
// import { appConfig } from './app/app.config';
// import { AppComponent } from './app/app.component';

// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));


import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { AppComponent } from './app/app.component';

import { LandingComponent } from './app/pages/landing/landing.component';
import { LoginComponent } from './app/pages/login/login.component';
import { SignupComponent } from './app/pages/signup/signup.component';
import { JobSeekerComponent } from './app/pages/job-seeker/job-seeker.component';
import { EmployerComponent } from './app/pages/employer/employer.component';
import { AdminComponent } from './app/pages/admin/admin.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'job-seeker', component: JobSeekerComponent },
  { path: 'employer', component: EmployerComponent },
  { path: 'admin', component: AdminComponent },
];

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)],
});
