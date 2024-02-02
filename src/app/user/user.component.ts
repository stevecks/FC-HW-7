import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Location } from '@angular/common';
import { BookService } from '../services/book.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    MatButtonModule
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {

  constructor(
    private location: Location,
    private bookService: BookService,
    public authService: AuthService,
  ) { }
  
  public goBack(): void {
    this.location.back();
  }

  public getUserName(): string {
    return this.authService._userName;
  }

  public getUserEmail(): string {
    return this.authService._userEmail;
  }
}
