import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="post-list">
      <h2>Posts</h2>
      <ul>
        <li *ngFor="let post of posts" (click)="selectPost(post.id)">
          {{ post.title }}
        </li>
      </ul>
    </div>
  `,
  styles: [
    `
      .post-list {
        padding: 20px;
        border: 1px solid #ddd;
        border-radius: 5px;
        background-color: #fafafa;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      ul {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      li {
        cursor: pointer;
        padding: 10px 15px;
        border-bottom: 1px solid #eee;
        transition: background-color 0.3s, transform 0.2s;
      }
      li:hover {
        background-color: #e0f7fa;
        transform: translateX(5px);
      }
      li:last-child {
        border-bottom: none;
      }
    `,
  ],
})
export class PostListComponent implements OnInit {
  @Input() userId: number = 1;
  posts: Post[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchPosts();
  }

  fetchPosts(): void {
    this.http
      .get<Post[]>(
        `https://jsonplaceholder.typicode.com/posts?userId=${this.userId}`
      )
      .subscribe((posts) => {
        this.posts = posts;
      });
  }

  selectPost(postId: number): void {
    // Emit event or call service to notify about post selection
    console.log('Post selected:', postId);
  }
}
