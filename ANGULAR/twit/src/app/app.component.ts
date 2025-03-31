import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { PostListComponent } from './post-list/post-list.component';
import { CommentListComponent } from './comment-list/comment-list.component';
import { HttpClient } from '@angular/common/http';

interface User {
  id: number;
  name: string;
  username: string;
  // ... other properties
}

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    FormsModule,
    UserProfileComponent,
    PostListComponent,
    CommentListComponent,
  ],
  template: `
    <div class="app-container">
      <div class="header">
        <select ngClass="onUserChange()">
          <option *ngFor="let user of users" [value]="user.id">
            {{ user.username }}
          </option>
        </select>
      </div>
      <div class="content">
        <app-user-profile></app-user-profile>
        <app-post-list [userId]="selectedUserId"></app-post-list>
        <app-comment-list [postId]="selectedPostId"></app-comment-list>
      </div>
    </div>
  `,
  styles: [
    `
      .app-container {
        font-family: sans-serif;
      }
      .header {
        padding: 10px;
        background-color: #f0f0f0;
      }
      .content {
        display: flex;
      }
    `,
  ],
})
export class AppComponent implements OnInit {
  users: User[] = [];
  selectedUserId: number = 1;
  selectedPostId: number = 1; // Default post ID

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.http
      .get<User[]>('https://jsonplaceholder.typicode.com/users')
      .subscribe((users) => {
        this.users = users;
      });
  }

  onUserChange(): void {
    this.selectedPostId = 1; // Reset to default or fetch the first post ID for the selected user
    // Optionally, implement logic to fetch and update the first post ID dynamically
  }
}
