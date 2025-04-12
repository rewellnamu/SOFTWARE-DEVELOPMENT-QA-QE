import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-seekerlogin',
  templateUrl: './job-seekerlogin.component.html',
  styleUrls: ['./job-seekerlogin.component.css'],
})
export class JobSeekerloginComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onSubmit(): void {
    if (this.email && this.password) {
      // Perform validation or API call here if needed
      console.log('Login successful:', {
        email: this.email,
        password: this.password,
      });
      this.router.navigate(['/jobseekerprofile']);
    } else {
      alert('Please fill in all required fields.');
    }
  }

  navigateToSignup(): void {
    this.router.navigate(['/job-seekersignup']);
  }

  onSignIn(): void {
    // Perform any necessary validation or API calls here
    this.router.navigate(['/jobseekerprofile']);
  }
}
