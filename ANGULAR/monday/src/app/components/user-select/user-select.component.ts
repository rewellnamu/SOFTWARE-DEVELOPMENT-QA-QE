import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-select',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Select User</h2>
    <select (change)="onUserChange($event)">
      <option *ngFor="let user of users" [value]="user.id">
        {{ user.name }}
      </option>
    </select>
  `,
})
export class UserSelectComponent implements OnInit {
  @Output() userChange = new EventEmitter<number>();
  users: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getUsers().subscribe((users) => (this.users = users));
  }

  onUserChange(event: Event): void {
    const userId = +(event.target as HTMLSelectElement).value;
    this.userChange.emit(userId);
  }
}
