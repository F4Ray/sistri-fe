import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Observable, throwError, of, BehaviorSubject } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import {
  ISignUp,
  ISignUpReturn,
  ISignin,
  IToken,
} from '../interfaces/i-signin';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root', // Add this line
})
export class UserService implements HttpInterceptor {
  private tokenSavedSubject = new BehaviorSubject<boolean>(false);
  private isLoggedin: boolean = false;
  keyToken: string = 'token';

  private http: HttpClient;
  private router: Router;

  constructor(http: HttpClient, router: Router) {
    this.http = http;
    this.router = router;
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const loginUrl = `/#/login`;

    // Exclude the /login route from being intercepted
    if (
      request.url.startsWith(environment.baseUrl) &&
      window.location.hash.includes(loginUrl)
    ) {
      return next.handle(request);
    }

    if (this.isLoggedin) {
      return next.handle(request);
    }

    return this.isAuthenticated().pipe(
      switchMap((authenticated) => {
        if (authenticated) {
          return next.handle(request);
        } else {
          const unauthorized = new HttpResponse({
            status: 401,
            statusText: 'Unauthorized',
          });
          this.router.navigate(['/login']);
          return of(unauthorized);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        if (
          error.error &&
          error.error.error ===
            'Full authentication is required to access this resource'
        ) {
          const unauthorized = new HttpResponse({
            status: 401,
            statusText: 'Unauthorized',
          });
          this.router.navigate(['/login']);
          return of(unauthorized);
        }
        return throwError(error);
      })
    );
  }

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

  setAuthentication(token: IToken) {
    this.isLoggedin = true;
    localStorage.setItem(this.keyToken, token.data.token);
    this.tokenSavedSubject.next(true);
  }

  getTokenSavedObservable(): Observable<boolean> {
    return this.tokenSavedSubject.asObservable();
  }

  isUserAuthenticated(): Observable<boolean> {
    return this.isAuthenticated();
  }

  private isAuthenticated(): Observable<boolean> {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.getToken(),
    };

    return this.http
      .get<any>(`${environment.baseUrl}/api/auth/check`, { headers })
      .pipe(
        map((response) => {
          if (response.status === 200 && response.success) {
            this.isLoggedin = true;
            return true;
          } else {
            this.isLoggedin = false;
            return false;
          }
        }),
        catchError((error) => {
          this.isLoggedin = false;
          // Handle authentication error
          if (
            error &&
            error.error &&
            error.error.error ===
              'Full authentication is required to access this resource'
          ) {
            // Return an observable with the false value instead of propagating the error
            return of(false);
          }
          // Return an observable with the false value for other errors
          return of(false);
        })
      );
  }
  signOut(): Observable<any> {
    localStorage.removeItem('token');

    return this.http.get<any>(`${environment.baseUrl}/api/auth/check`).pipe(
      catchError((error) => {
        if (
          error &&
          error.error &&
          error.error.error ===
            'Full authentication is required to access this resource'
        ) {
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
