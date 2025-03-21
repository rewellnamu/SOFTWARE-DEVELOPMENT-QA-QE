// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-plantab',
//   imports: [],
//   templateUrl: './plantab.component.html',
//   styleUrl: './plantab.component.css'
// })
// export class PlantabComponent {

// }

import { Component } from '@angular/core';

@Component({
  selector: 'app-plantab',
  templateUrl: './plantab.component.html',
  styleUrls: ['./plantab.component.css'],
})
export class PlantabComponent {
  newTask: string = '';
  tasks: string[] = [];

  addTask() {
    if (this.newTask.trim()) {
      this.tasks.push(this.newTask);
      this.newTask = '';
    }
  }

  removeTask(index: number) {
    this.tasks.splice(index, 1);
  }

  submitTasks() {
    if (this.tasks.length > 0) {
      alert('Tasks submitted: ' + this.tasks.join(', '));
      this.tasks = []; // Clear the list after submission
    } else {
      alert('No tasks to submit!');
    }
  }
}