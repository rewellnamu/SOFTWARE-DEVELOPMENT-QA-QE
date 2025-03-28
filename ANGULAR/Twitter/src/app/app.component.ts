import { Component } from '@angular/core';
import { UserSelectComponent } from './components/user-select/user-select.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { CommentListComponent } from './components/comment-list/comment-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UserSelectComponent, PostListComponent, CommentListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  selectedUserId = 1;
  selectedPostId!: number;

  onUserChange(userId: number) {
    this.selectedUserId = userId;
  }

  onPostChange(postId: number) {
    this.selectedPostId = postId;
  }
}