import { CustomerService } from './../../services/customer/customer.service';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private updateUserService : CustomerService,private authService: AuthenticationService) {}
  userProfile: any = {
  };


  ngOnInit(): void {
      this.fetchUserProfile();

  }

  fetchUserProfile(): void {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
            if (parsedUser) {
        this.userProfile = parsedUser; // Assign the correct data to userProfile

      }
    }
  }

  update()  {

}
}
