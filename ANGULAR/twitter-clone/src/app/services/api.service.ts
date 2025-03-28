import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private usersUrl = 'https://jsonplaceholder.typicode.com/users';
  private postsUrl = 'https://jsonplaceholder.typicode.com/posts';
  private commentsUrl = 'https://jsonplaceholder.typicode.com/comments';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.usersUrl);
  }

  getPosts(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.postsUrl}?userId=${userId}`);
  }

  getComments(postId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.commentsUrl}?postId=${postId}`);
  }
}