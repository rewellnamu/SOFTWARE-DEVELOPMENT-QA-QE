import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngFor="let post of posts" (click)="selectPost(post.id)">
      <h3>{{ post.title }}</h3>
      <p>{{ post.body }}</p>
    </div>
  `,
})
export class PostListComponent implements OnInit {
  @Input() userId: number = 1;
  @Output() postSelect = new EventEmitter<number>();
  posts: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getPosts(this.userId).subscribe(posts => {
      this.posts = posts;
      if (posts.length > 0) {
        this.selectPost(posts[0].id); // Select first post by default
      }
    });
  }

  selectPost(postId: number): void {
    this.postSelect.emit(postId);
  }
}