// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-admin',
//   imports: [],
//   templateUrl: './admin.component.html',
//   styleUrl: './admin.component.css'
// })
// export class AdminComponent {
// totalUsers: any;
// aiAccuracyData: any;

// }

import { Component } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-admin',
  imports: [NgxChartsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
[x: string]: any;
totalUsers: any;
aiAccuracyData: any;

}