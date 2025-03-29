import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="user-profile">
      <div class="profile-header">
        <img
          src="https://th.bing.com/th/id/OIP.AYDw385F_CMIJPPkGYUdLgHaEU?rs=1&pid=ImgDetMain"
          alt="Profile Picture"
          class="profile-pic"
        />
        <div class="profile-details">
          <h2>Bret</h2>
          <p class="username">{{user?.username}}</p>
          <p class="email">{{ user?.email }}</p>
          <p class="city">{{ user?.address?.city }}</p>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .user-profile {
        padding: 20px;
        border: 1px solid #ddd;
        border-radius: 5px;
        background-color: #f9f9f9;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transition: transform 0.2s ease-in-out;
      }
      .user-profile:hover {
        transform: scale(1.02);
      }
      .profile-header {
        display: flex;
        align-items: center;
      }
      .profile-pic {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        margin-right: 20px;
        border: 2px solid #007bff;
      }
      .profile-details h2 {
        margin: 0;
        font-size: 1.5rem;
        color: #333;
      }
      .profile-details .username {
        margin: 5px 0;
        font-size: 1rem;
        color: #555;
      }
      .profile-details .email {
        font-size: 0.9rem;
        color: #007bff;
      }
      .profile-details .city {
        font-size: 0.9rem;
        color: #666;
      }
    `,
  ],
})
export class UserProfileComponent implements OnInit {
  user: User | undefined;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<User>('https://jsonplaceholder.typicode.com/users/1')
      .subscribe((user) => {
        this.user = user;
      });
  }
}
