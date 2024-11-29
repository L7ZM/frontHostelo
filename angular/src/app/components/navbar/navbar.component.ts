import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  userRole='visitor';
  profileItems: MenuItem[] = [
    { label: 'Edit Profile', icon: 'pi pi-user-edit' },
    { label: 'Logout', icon: 'pi pi-sign-out', command: () => this.logout() }
  ];
  logout(): void {
    this.userRole = 'visitor';
    
  }
}
