// import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
// import { TodoComponent } from './plantab/plantab.component';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [RouterOutlet, TodoComponent],
//   templateUrl: './app.component.html',
//   styleUrl: './app.component.css'
// })
// export class AppComponent {
//   title = 'myapp';
// }
import { Component } from '@angular/core';

@Component({
  selector: 'app-todo',
  template: `<p>Todo works!</p>`,
  styleUrls: ['./plantab.component.css']
})
export class TodoComponent {}