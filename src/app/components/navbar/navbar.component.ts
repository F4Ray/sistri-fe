import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/services/loading.service';
import { MenuService } from 'src/app/services/menu.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {

  private userService = inject(UserService);
  private router = inject(Router);
  private loadingService = inject(LoadingService);
  private menuService = inject(MenuService);
  constructor() {
    console.log(this.router.url);
  }

  get hidenNavbar() {
    return this.router.url === '/' ? true : false;
  }

  onSignOut() {
    this.userService.signOut().subscribe(() => {
      this.router.navigate(['/login']);
      // Optionally, you can perform additional actions after successful logout
      console.log('Logged out successfully');
    });
  }

  isLoading() {
    return this.loadingService.isLoading();
  }

  getMenu() {
    return this.menuService.menus;
  }
}
