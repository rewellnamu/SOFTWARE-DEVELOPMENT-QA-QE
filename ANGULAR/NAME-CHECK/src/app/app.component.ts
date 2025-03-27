import { Component, effect, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { asyncNameValidator } from './validators/async-name-validator';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor],
  template: `
    <form (ngSubmit)="submitName()">
      <label for="name">Enter Name:</label>
      <input id="name" type="text" [formControl]="nameControl" />
      <div *ngIf="nameControl.pending">Checking availability...</div>
      <div *ngIf="nameControl.errors?.['nameTaken']">
        Name already exists. Please choose another one.
      </div>
      <div *ngIf="nameControl.errors?.['required']">
        Name is required.
      </div>

      <button type="submit" [disabled]="nameControl.invalid">
        Submit
      </button>
    </form>

    <!-- Display submitted names -->
    <div *ngIf="submittedNames.length > 0">
      <h3>Submitted Names:</h3>
      <ul>
        <li *ngFor="let name of submittedNames">{{ name }}</li>
      </ul>
    </div>
  `
})
export class AppComponent {
  nameControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
    asyncValidators: [asyncNameValidator()],
  });

  submittedNames: string[] = [];

  submitName() {
    if (this.nameControl.valid) {
      this.submittedNames.push(this.nameControl.value);
      console.log('Submitted Names:', this.submittedNames);
      this.nameControl.reset(); // Clear input field after submission
    }
  }
}
