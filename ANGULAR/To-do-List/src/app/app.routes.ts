import { Routes } from '@angular/router';
import { TodoComponent } from './todo/todo.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
  { path: '', component: AppComponent },  
  { path: 'todo', component: TodoComponent } 
];
