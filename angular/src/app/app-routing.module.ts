import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './components/customers Management/customer/customer.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RoomManagementComponent } from './components/room-management/room-management.component';
import { HomeComponent } from './components/home/home.component';
import { VirtualTourComponent } from './components/virtual-tour/virtual-tour.component';
import { RoomListComponent } from './components/room-list/room-list.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RoleGuard } from './guards/role.guard';
import { NoAuthGuard } from './guards/no-auth.guard';

const routes: Routes = [
  {
    path: '',

    component : HomeComponent
  },
  {
    path: 'profile',
    component: ProfileComponent  ,
    canActivate: [RoleGuard],
    data: { roles: ['ROLE_ADMIN', 'ROLE_USER'] }, // Accessible to both roles
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
    component: LoginComponent,
    canActivate:[NoAuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate:[NoAuthGuard]
  },
  {
    path: 'customers',
    component: CustomerComponent,
    canActivate: [RoleGuard],
    data: { roles: ['ROLE_ADMIN'] },
  },
  {
    path: 'rooms',
    component: RoomManagementComponent,
    canActivate: [RoleGuard],
    data: { roles: ['ROLE_ADMIN'] },
   },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
