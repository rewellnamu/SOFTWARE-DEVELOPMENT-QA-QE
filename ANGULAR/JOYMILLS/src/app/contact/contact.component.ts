// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-contact',
//   imports: [],
//   templateUrl: './contact.component.html',
//   styleUrl: './contact.component.css'
// })
// export class ContactComponent {

// }

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  name: string = '';
  email: string = '';
  message: string = '';

  submitForm() {
    if (this.name && this.email && this.message) {
      alert(`Thank you, ${this.name}! Your message has been submitted.`);
      this.name = '';
      this.email = '';
      this.message = '';
    } else {
      alert('Please fill in all fields.');
    }
  }
}