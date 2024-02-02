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
import { IRegister } from '../interfaces/register';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    //Location
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  constructor(
    private authService: AuthService,
    private router: Router,
    private location: Location,
  ) {}

  public RegisterForm = new FormGroup({
    name: new FormControl<string>('', Validators.required),
    email: new FormControl<string>('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl<string>('', Validators.required)
  });

  public get name(): FormControl<string> {
    return this.RegisterForm.get('name') as FormControl<string>;
  }

  public get email(): FormControl<string> {
    return this.RegisterForm.get('email') as FormControl<string>;
  }

  public get password(): FormControl<string> {
    return this.RegisterForm.get('password') as FormControl<string>;
  }
  

  public register(): void {
    let RegisterModel: IRegister = {
      name: this.name.value,
      email: this.email.value,
      password: this.password.value
    };
    this.authService.register(RegisterModel).subscribe(() => {
      this.router.navigate(['/login']);
    });
  }

  public goBack(): void {
    //this.location.back();
    this.router.navigate(['/home']);
  }

}
