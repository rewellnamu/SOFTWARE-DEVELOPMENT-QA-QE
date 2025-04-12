import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employerlogin',
  templateUrl: './employerlogin.component.html',
  styleUrl: './employerlogin.component.css',
})
export class EmployerloginComponent {
  constructor(private router: Router) {}

  onSignIn(): void {
    // Perform any necessary validation or API calls here
    this.router.navigate(['/employerboard']);
  }
}
