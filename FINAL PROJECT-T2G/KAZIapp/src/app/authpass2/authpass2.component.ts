import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authpass2',
  templateUrl: './authpass2.component.html',
  styleUrls: ['./authpass2.component.css'],
})
export class Authpass2Component {
  constructor(private router: Router) {}

  navigateToAdminSignup(): void {
    this.router.navigate(['/adminsignup']);
  }

  navigateToEmployerSignup(): void {
    this.router.navigate(['/employersignup']);
  }

  navigateToJobSeekerSignup(): void {
    this.router.navigate(['/job-seekersignup']);
  }
}
