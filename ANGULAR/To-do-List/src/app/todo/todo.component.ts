import { Component, OnInit, inject } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo',
  standalone: true,
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [],
  imports: [FormsModule, CommonModule]
})
export class TodoComponent implements OnInit {
  newTask: string = '';
  taskDuration: number | null = null;
  user_id: number = 1; 
  tasks: any[] = [];

  private todoService = inject(TodoService);

  ngOnInit() {
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.getTodos().subscribe((data: any) => {
      this.tasks = data;
    });
  }

  addTask() {
    if (this.newTask.trim() && this.taskDuration !== null && this.taskDuration > 0) {
      this.todoService.addTodo(this.user_id, this.newTask.trim(), this.taskDuration).subscribe(
        (newTask: any) => {
          this.tasks.push(newTask);
          this.newTask = '';
          this.taskDuration = null;
        },
        (error: any) => {
          console.error("Error adding task:", error);
        }
      );
    }
  }

  removeTask(id: number, index: number) {
    this.todoService.deleteTodo(id).subscribe({
      next: () => {
        this.tasks.splice(index, 1); // Remove from frontend if backend deletion is successful
      },
      error: (err) => console.error("Error deleting task:", err),
    });
  }
  editingTaskId: number | null = null;
editedTask: string = "";
editedDuration: number | null = null;
edit(id: number, index: number) {
  this.editingTaskId = id;
  this.editedTask = this.tasks[index].task;
  this.editedDuration = this.tasks[index].duration;
}
updateTask(id: number, index: number) {
  if (this.editedTask.trim() && this.editedDuration !== null && this.editedDuration > 0) {
    this.todoService.updateTodo(id, this.editedTask, this.editedDuration).subscribe({
      next: (response: any) => {
        this.tasks[index] = response.updatedTask; // Update frontend list
        this.editingTaskId = null; // Exit editing mode
      },
      error: (err) => console.error("Error updating task:", err),
    });
  }
}

  
}
