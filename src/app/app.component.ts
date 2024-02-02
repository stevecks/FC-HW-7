import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { NavComponent } from './nav/nav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet,
    NavComponent,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'FC-HW-7';

  constructor(
    public authService: AuthService,
  ) {}

  public login(): void {
    //this.authService.login();
  }

  public logout(): void {
    this.authService.logout();
  }

  //public getIsAuthorized(): boolean {
  //  //console.log(this.authService.isAuthorized);
  //  return this.authService.isAuthorized;
  //}

}
