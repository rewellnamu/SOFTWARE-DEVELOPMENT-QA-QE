import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployerboardComponent } from './employerboard/employerboard.component';
import { AuthpassComponent } from './authpass/authpass.component';
import { JobSeekerloginComponent } from './job-seekerlogin/job-seekerlogin.component';
import { AboutComponent } from './about/about.component';
import { JobSeekersignupComponent } from './job-seekersignup/job-seekersignup.component';
import { AdminsignupComponent } from './adminsignup/adminsignup.component';
import { EmployersignupComponent } from './employersignup/employersignup.component';
import { JobseekerProfileComponent } from './jobseekerprofile/jobseekerprofile.component';
import { EmployerloginComponent } from './employerlogin/employerlogin.component';
import { AIboardComponent } from './aiboard/aiboard.component';
import { JobseekerboardComponent } from './jobseekerboard/jobseekerboard.component';

const routes: Routes = [
  { path: 'employerboard', component: EmployerboardComponent },
  { path: 'authpass', component: AuthpassComponent },
  { path: 'job-seekerlogin', component: JobSeekerloginComponent },
  { path: 'about', component: AboutComponent },
  { path: 'job-seekersignup', component: JobSeekersignupComponent },
  { path: 'adminsignup', component: AdminsignupComponent },
  { path: 'employersignup', component: EmployersignupComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'jobseekerprofile', component: JobseekerProfileComponent },
  { path: 'employerlogin', component: EmployerloginComponent },
  { path: 'aiboard', component: AIboardComponent },
  { path: 'jobseekerboard', component: JobseekerboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
