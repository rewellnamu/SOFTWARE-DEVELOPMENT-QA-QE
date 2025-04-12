import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent {
// Removed duplicate navigateToAuthpass2 method
  constructor(private router: Router) {}

  navigateToAdmin() {
    this.router.navigate(['/adminlogin']);
  }

  navigateToJobSeeker() {
    this.router.navigate(['/job-seekerlogin']);
  }

  navigateToEmployer(): void {
    this.router.navigate(['/employerlogin']);
  }

  navigateToAuthpass() {
    this.router.navigate(['/authpass']);
  }
  navigateToAuthpass2() {
    this.router.navigate(['/authpass2']);
  }
}
