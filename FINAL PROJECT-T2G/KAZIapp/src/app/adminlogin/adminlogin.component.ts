import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrl: './adminlogin.component.css',
})
export class AdminloginComponent {
  constructor(private router: Router) {}

  navigateToSignup(): void {
    this.router.navigate(['/adminsignup']);
  }

  onSignIn(): void {
    // Perform any necessary validation or API calls here
    this.router.navigate(['/adminboard']);
  }
}
