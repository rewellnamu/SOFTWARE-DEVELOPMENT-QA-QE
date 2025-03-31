import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/users`);
  }

  getPosts(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/posts?userId=${userId}`);
  }

  getComments(postId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/comments?postId=${postId}`);
  }
}
