import { Injectable, inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';

// export const AuthGuard = () => {
//   const userService = inject(UserService);
//   const router = inject(Router);

//   if (userService.isAuthenticated()) {
//     return true;
//   } else {
//     router.navigate(['']);
//   }
//   return false;
// };

// export const PreventGuard = (): boolean => {
//   const userService = inject(UserService);
//   const router = inject(Router);

//   if (userService.isAuthenticated()) {
//     router.navigate(['/main/consumers']);
//     return false;
//   }

//   return true;
// }
// // };
// @Injectable({
//   providedIn: 'root',
// })
// export class AuthGuard {
//   constructor(private authService: UserService, private router: Router) {}

//   canActivate: CanActivateFn = (route, state) => {
//     return this.authService.isAuthenticated().pipe(
//       map((isAuthenticated) => {
//         if (isAuthenticated) {
//           // User is authenticated, allow access to the requested route
//           return true;
//         } else {
//           // User is not authenticated, redirect to the login page
//           return this.router.createUrlTree(['/login']);
//         }
//       }),
//       catchError((error) => {
//         // Handle authentication error
//         if (
//           error &&
//           error.error &&
//           error.error.error ===
//             'Full authentication is required to access this resource'
//         ) {
//           // Redirect to the login page if full authentication is required
//           return this.router.createUrlTree(['/login']);
//         }
//         // Handle other errors as needed
//         return of(false);
//       })
//     );
//   };
// }


@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private userService: UserService, private router: Router) {}

  canActivate: CanActivateFn = (route, state) => {
    return this.userService.isAuthenticated().pipe(
      map((isAuthenticated) => {
        if (isAuthenticated) {
          // User is authenticated, allow access to the requested route
          return true;
        } else {
          // User is not authenticated, redirect to the login page
          return this.router.createUrlTree(['/login']);
        }
      }),
      catchError((error) => {
        if (
          error &&
          error.error &&
          error.error.error ===
            'Full authentication is required to access this resource'
        ) {
          return of(this.router.createUrlTree(['/login']));
          console.log(error);
        }
        return of(false);
      })
    );
  };
}