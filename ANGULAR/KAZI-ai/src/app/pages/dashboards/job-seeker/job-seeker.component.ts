// import { Component } from '@angular/core';
// import {}
// @Component({
//   selector: 'app-job-seeker',
//   imports: [],
//   templateUrl: './job-seeker.component.html',
//   styleUrl: './job-seeker.component.css'
// })
// export class JobSeekerComponent {
// skillsData: any;

// }


import { Component } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-job-seeker',
  imports: [NgxChartsModule],
  templateUrl: './job-seeker.component.html',
  styleUrl: './job-seeker.component.css'
})
export class JobSeekerComponent {
  skillsData = [
    { name: 'JavaScript', value: 80 },
    { name: 'Angular', value: 70 },
    { name: 'TypeScript', value: 60 }
  ];
  // Define the jobs property
jobs = [
  { title: 'Software Engineer', company: 'TechCorp' },
  { title: 'Data Analyst', company: 'DataSolutions' },
  { title: 'Product Manager', company: 'Innovate Inc.' }
];
  
}