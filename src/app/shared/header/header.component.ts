import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  constructor(public auth: AuthService, private http: HttpClient) {}

  ngOnInit() {
    this.auth.user$.subscribe(user => {
      if (user && user.sub) {
        this.getUser(user.sub).subscribe(
          existingUser => {
            if (!existingUser) {
              this.addUserToDatabase(user);
            }
          },
          error => {
            if (error.status === 404) {
              this.addUserToDatabase(user);
            }
          }
        );
      }
    });
  }

  login() {
    this.auth.loginWithRedirect();
  }

  logout() {
    this.auth.logout();
  }

  private getUser(userId: string) {
    return this.http.get<any>(`http://localhost:3000/users/${userId}`);
  }

  private addUserToDatabase(user: any) {
    const newUser = {
      id: user.sub,
      name: user.name,
      email: user.email
    };
    this.http.post('http://localhost:3000/users', newUser).subscribe();
  }
}
