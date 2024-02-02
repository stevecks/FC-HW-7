import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ILogin } from './interfaces/login';
import { IRegister } from './interfaces/register';
import { Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isAuthorized: boolean = false;
  private _accessToken: string = '';
  private _user: string = '';
  public _userName: string = '';
  public _userEmail: string = '';

  constructor(
    private router: Router,
    private httpClient: HttpClient
  ) { }

  public get accessToken(): string {
    return this._accessToken;
  }

  public get isAuthorized(): boolean {
    //return this._accessToken != '';
    return this._isAuthorized;
  }

  /*
  public login(model: ILogin): Observable<any> {
    let headers = new HttpHeaders({
      ['accept']: 'application/json',
      ['Content-Type']: 'application/json'
    });
    return this.httpClient.post(environment.apiUrl + 'auth/login', JSON.stringify(model), {
      headers: headers
    })
    //this.router.navigate(['/books']);
    //this._user = loginModel.email;
    //this._isAuthorized = true;
  }
  */

  public login(model: ILogin): Observable<any> {
    let headers = new HttpHeaders({ ['Content-Type']: 'application/json' });

    return this.httpClient.post<any>(environment.apiUrl + 'auth/login', JSON.stringify(model), {
      headers: headers
    })
      .pipe(
        tap({
          next: result => {
            this._accessToken = result.accessToken;
            this.parseUserName();
            this._isAuthorized = true;
          }, error: _ => {
            this._accessToken = '';
            this._user = '';
            this._userName = '';
            this._userEmail = '';
          }
        })
      );
  }

  public register(model: IRegister): Observable<any> {
    let headers = new HttpHeaders({ ['Content-Type']: 'application/json' });
    return this.httpClient.post(environment.apiUrl + 'auth/register', JSON.stringify(model), {
      headers: headers
    })
  }

  public applogin(): void {
    this.router.navigate(['/login']);
    //this._user = loginModel.email;
    //this._isAuthorized = true;
  }

  public appregister(): void {
    this.router.navigate(['/register']);
    //this._user = loginModel.email;
    //this._isAuthorized = true;
  }

  public logout(): void {
    this._isAuthorized = false;
    this._user = '';
    this._userName = '';
    this._userEmail = '';
    this.router.navigate(['/']);
  }

  private parseUserName(): void {
    let payload = this._accessToken.split(".")[1];
    let authDataString = atob(payload);
    let authData = JSON.parse(authDataString);
    this._user = `${authData.name} <${authData.email}>`;
    this._userName = `${authData.name}`;
    this._userEmail = `${authData.email}`;
  }

}
