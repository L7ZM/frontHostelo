import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(private authService: AuthenticationService) {}
  sidebarVisible: boolean = false;
  userRole = 'visitor';
  ngOnInit(): void {
    this.manageRoles(); // Determine the role on component initialization
    console.log(this.userRole); // Check the assigned role
  }

manageRoles() {
  const roles = this.authService.getRoles(); // Get the roles
  if (roles) {
    if (roles.includes('ROLE_USER')) {
      this.userRole = 'user'; // Set userRole to 'user'
    } else if (roles.includes('ROLE_ADMIN')) {
      this.userRole = 'staff'; // Set userRole to 'staff'
    }
  }
}

  profileItems: MenuItem[] = [
    { label: 'Edit Profile', icon: 'pi pi-user-edit', routerLink: "profile"  },
    { label: 'Logout', icon: 'pi pi-sign-out', command: () => this.logout() },
  ];
  logout(): void {
    this.userRole = 'visitor';
  }

  // Method to toggle sidebar visibility
  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }
}
