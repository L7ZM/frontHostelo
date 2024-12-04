import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private authService: AuthenticationService,private router:Router){}
  ngOnInit(): void {
    if (this.authService.isTokenExpired()) {
      this.authService.logout();
      this.router.navigate(['/login']); // Navigate to login instead of reloading
    }}
}
