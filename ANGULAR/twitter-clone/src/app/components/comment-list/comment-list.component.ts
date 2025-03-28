import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comment-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngFor="let comment of comments">
      <h4>{{ comment.name }}</h4>
      <p>{{ comment.body }}</p>
    </div>
  `,
})
export class CommentListComponent implements OnInit {
  @Input() postId: number = 1;
  comments: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getComments(this.postId).subscribe(comments => {
      this.comments = comments;
    });
  }
}