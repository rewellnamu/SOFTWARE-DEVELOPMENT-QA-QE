import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jobseekerboard',
  templateUrl: './jobseekerboard.component.html',
  styleUrl: './jobseekerboard.component.css',
})
export class JobseekerboardComponent {
  constructor(private router: Router) {}

  navigateToProfile(): void {
    this.router.navigate(['/jobseekerprofile']);
  }
}
