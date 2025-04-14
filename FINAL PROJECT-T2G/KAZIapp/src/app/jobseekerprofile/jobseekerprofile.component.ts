import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jobseekerprofile',
  templateUrl: './jobseekerprofile.component.html',
  styleUrls: ['./jobseekerprofile.component.css'],
})
export class JobseekerProfileComponent {
  constructor(private router: Router) {}

  navigateToJobseekerBoard() {
    this.router.navigate(['/jobseekerboard']);
  }

  logout(): void {
    this.router.navigate(['/job-seekerlogin']);
  }
}
