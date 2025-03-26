import { Component, effect, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { asyncNameValidator } from '../validators/async-name-validator';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-name',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  template: `
    <form>
      <label for="name">Enter Name:</label>
      <input id="name" type="text" [formControl]="nameControl" />
      <div *ngIf="nameControl.pending">Checking availability...</div>
      <div *ngIf="nameControl.errors?.nameTaken">
        Name already exists. Please choose another one.
      </div>
      <div *ngIf="nameControl.errors?.required">
        Name is required.
      </div>
    </form>
  `
})
export class NameComponent {
  nameControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
    asyncValidators: [asyncNameValidator()],
  });

  constructor() {
    effect(() => {
      console.log('Name value:', this.nameControl.value);
    });
  }
}
