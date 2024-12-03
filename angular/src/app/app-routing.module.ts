import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './components/customers Management/customer/customer.component';
import { LoginComponent } from './components/login/login.component';
import { AccessGuardService } from './services/guard/access-guard.service';
import { RegisterComponent } from './components/register/register.component';
import { RoomManagementComponent } from './components/room-management/room-management.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { HomeComponent } from './components/home/home.component';
import { VirtualTourComponent } from './components/virtual-tour/virtual-tour.component';
import { RoomListComponent } from './components/room-list/room-list.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component : HomeComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'tour',
    component: VirtualTourComponent
  },
  {
    path: 'roomList',
    component: RoomListComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'sideBar',
    component: SideBarComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'customers',
    component: CustomerComponent,
    // canActivate: [AccessGuardService]
  },
  {
    path: 'rooms',
    component: RoomManagementComponent  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
