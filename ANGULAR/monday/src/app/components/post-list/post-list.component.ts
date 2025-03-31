import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Posts</h2>
    <ul>
      <li *ngFor="let post of posts" (click)="onPostSelect(post.id)">
        {{ post.title }}
      </li>
    </ul>
  `,
})
export class PostListComponent implements OnChanges {
  @Input() userId: number | null = null;
  @Output() postSelect = new EventEmitter<number>();
  posts: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userId'] && this.userId) {
      this.apiService
        .getPosts(this.userId)
        .subscribe((posts) => (this.posts = posts));
    }
  }

  onPostSelect(postId: number): void {
    this.postSelect.emit(postId);
  }
}
