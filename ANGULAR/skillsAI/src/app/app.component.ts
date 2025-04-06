import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import { LoginComponent } from "./pages/login/login.component";
// import { AdminComponent } from "./pages/admin/admin.component";
// import { EmployerComponent } from "./pages/employer/employer.component";
// import { JobSeekerComponent } from "./pages/job-seeker/job-seeker.component";
// import { SignupComponent } from "./pages/signup/signup.component";
import { LandingComponent } from "./pages/landing/landing.component";

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [ LandingComponent ],
  // imports: [ LoginComponent, AdminComponent, EmployerComponent, JobSeekerComponent, SignupComponent, LandingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'skillsAI';
}
