import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { LogOutComponent } from '../dialogs/log-out/log-out.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  
  constructor(
    public authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  //public login(): void {
  //  this.authService.login();
  //}

  public applogin(): void {
    this.authService.applogin();
  }

  public appregister(): void {
    this.authService.appregister();
  }

  public appUser(): void {
    this.router.navigate(['/user']);
  }

//  public logout(): void {
//    this.authService.logout();
//  }

  public logout(): void {
    const dialogRef = this.dialog.open(LogOutComponent);
    dialogRef.afterClosed().subscribe((res: boolean) => {
      if (res) {
        this.authService.logout();
      }
    });
  }

  public ngOnInit(): void {
    //this.guestItems = this.headerService.getguestItems();
    //this.userItems = this.headerService.getuserItems();
  }
}
