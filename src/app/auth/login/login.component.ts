import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ILogin } from '../interfaces/login';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Location } from '@angular/common';
import { NavComponent } from '../../nav/nav.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(
    private authService: AuthService,
    private router: Router,
    private location: Location,
  ) { }

  public loginForm = new FormGroup({
    email: new FormControl<string>('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl<string>('', Validators.required)
  });

  public get email(): FormControl<string> {
    return this.loginForm.get('email') as FormControl<string>;
  }

  public get password(): FormControl<string> {
    return this.loginForm.get('password') as FormControl<string>;
  }

  public login(): void {
    let loginModel: ILogin = {
      email: this.email.value,
      password: this.password.value
    };
    this.authService.login(loginModel).subscribe({
      next: () => {
        this.router.navigate(['/books']);
      },
      error: () => {
        alert("Nope");
      }
    });
  }

  public goBack(): void {
    //this.location.back();
    this.router.navigate(['/home']);
  }

}
