import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserSelectComponent } from './components/user-select/user-select.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { CommentListComponent } from './components/comment-list/comment-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    UserSelectComponent,
    PostListComponent,
    CommentListComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'monday';
  selectedUserId: number | null = null;
  selectedPostId: number | null = null;

  onUserChange(userId: number): void {
    this.selectedUserId = userId;
    this.selectedPostId = null; // Reset post selection
  }

  onPostSelect(postId: number): void {
    this.selectedPostId = postId;
  }
}
