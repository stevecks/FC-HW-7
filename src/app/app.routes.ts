import { Routes } from '@angular/router';
import { authGuard } from './auth/guards/auth.guard';
import { nonAuthGuard } from './auth/guards/non-auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { BooksComponent } from './books/books.component';
import { EditComponent } from './edit/edit.component';
import { HomeComponent } from './home/home.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { UserComponent } from './user/user.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent,
        //canActivate: [authGuard]
      },
      {
        path: 'books',
        component: BooksComponent,
        canActivate: [authGuard]
      },
      {
        path: 'edit',
        component: EditComponent,
        canActivate: [authGuard]
      },
      {
        path: 'books/:id', 
        component: BookDetailComponent,
        canActivate: [authGuard] 
      },
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [nonAuthGuard]
      },
      {
        path: 'register',
        component: RegisterComponent,
        canActivate: [nonAuthGuard]
      },
      {
        path: 'user',
        component: UserComponent,
        canActivate: [authGuard]
      },
];
