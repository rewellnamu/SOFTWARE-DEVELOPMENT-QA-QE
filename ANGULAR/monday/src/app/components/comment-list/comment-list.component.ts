import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comment-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Comments</h2>
    <ul>
      <li *ngFor="let comment of comments">
        <strong>{{ comment.name }}</strong
        >: {{ comment.body }}
      </li>
    </ul>
  `,
})
export class CommentListComponent implements OnChanges {
  @Input() postId: number | null = null;
  comments: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['postId'] && this.postId) {
      this.apiService
        .getComments(this.postId)
        .subscribe((comments) => (this.comments = comments));
    }
  }
}
