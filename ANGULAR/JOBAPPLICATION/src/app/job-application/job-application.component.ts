import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-job-application',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './job-application.component.html',
  styleUrls: ['./job-application.component.css'],
})
export class JobApplicationComponent {
  jobApplicationForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.jobApplicationForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      skills: this.fb.array([]),
    });
  }

  get skills(): FormArray {
    return this.jobApplicationForm.get('skills') as FormArray;
  }

  addSkill(): void {
    this.skills.push(this.fb.control('', Validators.required));
  }

  removeSkill(index: number): void {
    this.skills.removeAt(index);
  }

  onSubmit(): void {
    if (this.jobApplicationForm.valid) {
      console.log('Form Submitted:', this.jobApplicationForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
}
