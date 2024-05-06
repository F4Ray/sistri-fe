import { HttpClient } from '@angular/common/http';
import { Router, UrlTree } from '@angular/router';
import {
  ISignUp,
  ISignUpReturn,
  ISignin,
  IToken,
} from '../interfaces/i-signin';
import { BehaviorSubject, Observable, catchError, map, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private tokenSavedSubject = new BehaviorSubject<boolean>(false);
  isLoggedin: boolean = false;
  keyToken: string = 'token';

  private http = inject(HttpClient);
  private router = inject(Router);

  constructor() {}

  signIn(user: ISignin): Observable<IToken> {
    const headers = {
      'Content-Type': 'application/json',
    };
    const body = JSON.stringify(user);

    return this.http.post<IToken>(
      `${environment.baseUrl}/api/auth/login`,
      body,
      {
        headers,
      }
    );
  }

  signUp(user: ISignUp): Observable<ISignUpReturn> {
    const headers = {
      'Content-Type': 'application/json',
    };
    const body = JSON.stringify(user);
    console.log(body);

    return this.http.post<ISignUpReturn>(
      `${environment.baseUrl}/api/auth/register`,
      body,
      {
        headers,
      }
    );
  }

  // setAuthentication(token: IToken) {
  //   this.isLoggedin = true;
  //   localStorage.setItem(this.keyToken, token.data.token);
  // }

  setAuthentication(token: IToken) {
    this.isLoggedin = true;
    localStorage.setItem(this.keyToken, token.data.token);
    this.tokenSavedSubject.next(true);
  }

  getTokenSavedObservable(): Observable<boolean> {
    return this.tokenSavedSubject.asObservable();
  }

  // isAuthenticated(): boolean {
  //   if (localStorage.getItem(this.keyToken)) {
  //     this.isLoggedin = true;
  //     return this.isLoggedin;
  //   }
  //   return false;
  // }

  isAuthenticated(): Observable<boolean | UrlTree> {
    // Check if the authentication status is already known
    // if (this.isLoggedin) {
    //   return of(true);
    // }

    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.getToken(),
    };
    // Make an HTTP request to check the authentication status
    return this.http
      .get<any>(`${environment.baseUrl}/api/auth/check`, { headers })
      .pipe(
        map((response) => {
          // Handle the server response and update the authentication status
          if (response.status === 200 && response.success) {
            this.isLoggedin = true;
            return true;
          } else {
            this.isLoggedin = false;
            return false;
          }
        }),
        catchError((error) => {
          console.log(error);
          // Handle authentication error
          if (
            error &&
            error.error &&
            error.error.error ===
              'Full authentication is required to access this resource'
          ) {
            // Redirect to the login page if full authentication is required
            return of(this.router.createUrlTree(['/login']));
          }
          // Handle other errors as needed
          this.isLoggedin = false;
          return of(false);
        })
      );
  }

  signOut(): Observable<any> {
    // 1. Delete token from local storage
    localStorage.removeItem('token');

    // 2. Check if authentication is still valid
    return this.http.get<any>(`${environment.baseUrl}/api/auth/check`).pipe(
      catchError((error) => {
        console.log(error);
        // If authentication check fails, redirect to login
        if (
          error &&
          error.error &&
          error.error.error ===
            'Full authentication is required to access this resource'
        ) {
          // Redirect to the login page if full authentication is required
          return of(this.router.createUrlTree(['/login']));
        }
        this.isLoggedin = false;
        return of(false);
      })
    );
  }

  getToken(): string {
    return localStorage.getItem(this.keyToken) || '';
  }
}
