import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // 
})
export class TodoService {
  private apiUrl = 'http://localhost:5000'; 
  

  constructor(private http: HttpClient) {}

  // Fetch all todos
  getTodos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/todos`);
  }

  // Add a new todo
  addTodo(user_id: number, task: string, duration: Number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/todos`, { user_id, task, duration });
  }

  // Fetch all users
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users`);
  }
  deleteTodo(id: number) {
    return this.http.delete(`http://localhost:5000/todos/${id}`);
  }
  updateTodo(id: number, task: string, duration: number) {
    return this.http.put(`http://localhost:5000/todos/${id}`, { task, duration });
  }
  
}
