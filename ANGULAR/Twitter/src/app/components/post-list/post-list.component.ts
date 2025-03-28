import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnChanges {
  @Input() userId!: number;
  @Output() postChange = new EventEmitter<number>();
  posts: any[] = [];
  selectedPostId!: number;

  constructor(private apiService: ApiService) {}

  ngOnChanges() {
    if (this.userId) {
      this.apiService.getPostsByUser(this.userId).subscribe((data) => {
        this.posts = data;
        if (this.posts.length > 0) {
          this.selectedPostId = this.posts[0].id;
          this.postChange.emit(this.selectedPostId);
        }
      });
    }
  }

  onPostClick(postId: number) {
    this.postChange.emit(postId);
  }
}