import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authpass',
  templateUrl: './authpass.component.html',
  styleUrls: ['./authpass.component.css'],
})
export class AuthpassComponent {
  constructor(private router: Router) {}

  navigateToJobSeeker(): void {
    this.router.navigate(['/job-seekerlogin']);
  }

  navigateToEmployer(): void {
    this.router.navigate(['/employerlogin']);
  }

  navigateToAdmin(): void {
    this.router.navigate(['/adminlogin']);
  }
}
