import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-select.component.html',
  styleUrls: ['./user-select.component.css'],
})
export class UserSelectComponent implements OnInit {
  users: any[] = [];
  selectedUserId = 1; // Default user ID

  @Output() userChange = new EventEmitter<number>();

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  onUserChange() {
    this.userChange.emit(this.selectedUserId);
  }
}