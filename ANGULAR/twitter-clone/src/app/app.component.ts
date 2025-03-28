import { Component } from '@angular/core';
import { UserSelectComponent } from './components/user-select/user-select.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { CommentListComponent } from './components/comment-list/comment-list.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UserSelectComponent, PostListComponent, CommentListComponent, HttpClientModule],
  template: `
    <app-user-select (userChange)="onUserChange($event)"></app-user-select>
    <app-post-list [userId]="selectedUserId" (postSelect)="onPostSelect($event)"></app-post-list>
    <app-comment-list [postId]="selectedPostId"></app-comment-list>
  `,
})
export class AppComponent {
  selectedUserId: number = 1;
  selectedPostId: number = 1;

  onUserChange(userId: number): void {
    this.selectedUserId = userId;
  }

  onPostSelect(postId: number): void {
    this.selectedPostId = postId;
  }
}