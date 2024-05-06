import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { UserService } from './user.service';
import { Subject, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuService implements OnDestroy {
  private unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(private http: HttpClient, private userService: UserService) {
    this.userService
      .getTokenSavedObservable()
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(() => {
        this.fetchMenuData();
      });
    // this.fetchMenuData();
  }

  // menus = [
  //   {
  //     title: 'User',
  //     mainPath: '/main/user',
  //   },
  //   {
  //     title: 'Consumer',
  //     mainPath: '/main/consumer',
  //   },
  //   {
  //     title: 'Order',
  //     mainPath: '/main/order',
  //   },
  // ];
  menus: { title: string; mainPath: string }[] = [];

  fetchMenuData() {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.userService.getToken(),
    };
    this.http
      .get<any>(`${environment.baseUrl}/api/auth/check`, { headers })
      .subscribe(
        (response) => {
          if (response.success) {
            this.updateMenus(response.data);
          } else {
            console.error('Failed to fetch menu data:', response.message);
          }
        },
        (error) => {
          console.error('Failed to fetch menu data:', error);
        }
      );
  }

  ngOnDestroy() {
    this.unsubscribeAll.next(null);
    this.unsubscribeAll.complete();
  }

  // fetchMenuData() {
  //   const headers = {
  //     'Content-Type': 'application/json',
  //     Authorization: 'Bearer ' + this.userService.getToken(),
  //   };
  //   this.http
  //     .get<any>(`${environment.baseUrl}/api/auth/check`, { headers })
  //     .subscribe(
  //       (response) => {
  //         if (response.success) {
  //           this.updateMenus(response.data);
  //         } else {
  //           console.error('Failed to fetch menu data:', response.message);
  //         }
  //       },
  //       (error) => {
  //         console.error('Failed to fetch menu data:', error);
  //       }
  //     );
  // }

  private updateMenus(data: any[]) {
    this.menus = data.map((item) => {
      return {
        title: item.mainPath,
        mainPath: item.title,
      };
    });
  }

  getMenu() {
    return this.menus;
  }
}
