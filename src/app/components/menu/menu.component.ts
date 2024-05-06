import { Component, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { MenuService } from 'src/app/services/menu.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  constructor(
    private offcanvasService: NgbOffcanvas,
    private menuService: MenuService,
    private userService: UserService,
    private router : Router
  ) {}

  open(content: TemplateRef<any>) {
    this.offcanvasService.open(content);
  }

  close(content: TemplateRef<any>) {
    this.offcanvasService.dismiss(content);
  }

  getMenu() {
    return this.menuService.menus;
  }

  onSignOut() {
    this.userService.signOut().subscribe(() => {
      this.router.navigate(['/login']);
      // Optionally, you can perform additional actions after successful logout
      console.log('Logged out successfully');
    });
  }
}
