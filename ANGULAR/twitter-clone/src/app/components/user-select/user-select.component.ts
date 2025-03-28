import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-select',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <select [(ngModel)]="selectedUserId" (change)="userSelected()">
      <option *ngFor="let user of users" [value]="user.id">{{ user.username }}</option>
    </select>
  `,
})
export class UserSelectComponent implements OnInit {
  @Output() userChange = new EventEmitter<number>();
  users: any[] = [];
  selectedUserId: number = 1;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
   // this.apiService.getUsers().subscribe(users => {
    this.apiService.getUsers().subscribe((users: any[]) => {
      this.users = users;
      this.userSelected(); // Trigger initial selection
    });
  }

  userSelected(): void {
    this.userChange.emit(this.selectedUserId);
  }
}