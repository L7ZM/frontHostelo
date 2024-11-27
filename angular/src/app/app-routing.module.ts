import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './components/customer/customer.component';
import { LoginComponent } from './components/login/login.component';
import { AccessGuardService } from './services/guard/access-guard.service';
import { RegisterComponent } from './components/register/register.component';
import { RoomManagementComponent } from './components/room-management/room-management.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
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
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'customers',
    component: CustomerComponent,
    canActivate: [AccessGuardService]
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
