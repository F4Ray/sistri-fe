import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class PreventGuard {
  constructor(private userService: UserService, private router: Router) {}

  canActivate: CanActivateFn = (route, state) => {
    return this.userService.isAuthenticated().pipe(
      map((result) => {
        if (typeof result === 'boolean') {
          if (result) {
            // User is authenticated, redirect to the customers route
            return this.router.createUrlTree(['/main/consumer']);
          } else {
            // User is not authenticated, allow access to the requested route
            return true;
          }
        } else {
          // Handle UrlTree result
          return result;
        }
      }),
      catchError((error) => {
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
        return of(false);
      })
    );
  }
}
