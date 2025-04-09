import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../pages/login/login.component';
import { JobSeekerComponent } from '../pages/job-seeker/job-seeker.component';
import { EmployerComponent } from '../pages/employer/employer.component';
import { AdminComponent } from '../pages/admin/admin.component';
import { SignupComponent } from '../pages/signup/signup.component';


@Component({
  standalone: true,
  selector: 'app-landing',
  imports: [],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
})
export class LandingComponent {
  constructor(private router: Router) {}

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
