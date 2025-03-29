import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

@Component({
  selector: 'app-comment-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="comment-list">
      <h2>Comments</h2>
      <ul>
        <li *ngFor="let comment of comments">
          <h3>{{ comment.name }}</h3>
          <p>{{ comment.body }}</p>
        </li>
      </ul>
    </div>
  `,
  styles: [
    `
      .comment-list {
        padding: 20px;
        border: 1px solid #ddd;
        border-radius: 5px;
        background-color: #f9f9f9;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      
      ul {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      li {
        padding: 12px 16px;
        border-bottom: 1px solid #eee;
        transition: background-color 0.3s, transform 0.2s;
      }
      li:hover {
        background-color: #e3f2fd;
        transform: translateX(5px);
      }
      li:last-child {
        border-bottom: none;
      }
      h3 {
        margin: 0 0 5px;
        font-size: 16px;
        color: yellowgreen;
      }
      
      p {
        margin: 0;
        font-size: 14px;
        color: #555;
      }
    `,
  ],
})
export class CommentListComponent implements OnInit {
  @Input() postId: number = 1;
  comments: Comment[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchComments();
  }

  fetchComments(): void {
    this.http
      .get<Comment[]>(
        `https://jsonplaceholder.typicode.com/comments?postId=${this.postId}`
      )
      .subscribe((comments) => {
        this.comments = comments;
      });
  }
}
