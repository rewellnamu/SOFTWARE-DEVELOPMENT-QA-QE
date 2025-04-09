import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LandingComponent } from "./landing/landing.component";
import { AuthpassComponent } from "./authpass/authpass.component";
import { JobSeekerloginComponent } from "./job-seekerlogin/job-seekerlogin.component";
import { JSDocComment } from '@angular/compiler';
import { JobSeekersignupComponent } from './job-seekersignup/job-seekersignup.component';
import { EmployerloginComponent } from "./employerlogin/employerlogin.component";
import { EmployersignupComponent } from "./employersignup/employersignup.component";
import { AdminloginComponent } from "./adminlogin/adminlogin.component";
import { AdminsignupComponent } from "./adminsignup/adminsignup.component";
import { JobseekerprofileComponent } from './jobseekerprofile/jobseekerprofile.component';
import { JobseekerboardComponent } from './jobseekerboard/jobseekerboard.component';
import { EmployerboardComponent } from './employerboard/employerboard.component';
import { AdminboardComponent } from './adminboard/adminboard.component';
import { AIboardComponent } from './aiboard/aiboard.component';

@Component({
  selector: 'app-root',
  imports: [ LandingComponent, AdminloginComponent, JobseekerprofileComponent, 
    AuthpassComponent, JobSeekerloginComponent, JobSeekersignupComponent,
     EmployerloginComponent, EmployersignupComponent, AdminsignupComponent, 
    JobseekerboardComponent, EmployerboardComponent, AdminboardComponent, 
  AIboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'KAZIapp';
}

