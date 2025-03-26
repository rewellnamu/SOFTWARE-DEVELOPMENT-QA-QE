import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NameComponent } from './name/name.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NameComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'NAME-CHECK';
}

// import { Component } from '@angular/core';
// import { TodoComponent } from './todo/todo.component';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css'],
//   imports: [TodoComponent], 
// })
// export class AppComponent {
//   title = 'To-Do List';
// }
