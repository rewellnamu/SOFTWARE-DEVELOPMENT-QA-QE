// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-employer',
//   imports: [],
//   templateUrl: './employer.component.html',
//   styleUrl: './employer.component.css'
// })
// export class EmployerComponent {

// }

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employer',
  imports: [CommonModule],
  templateUrl: './employer.component.html',
  styleUrl: './employer.component.css'
})
export class EmployerComponent {
candidates: any;

}