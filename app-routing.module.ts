import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ClientComponent } from './client/client.component';
import { AgencyComponent } from './agency/agency.component';
import { AdminComponent } from './admin/admin.component';
import { InitialComponent } from './initial/initial.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { RegisterComponent } from './register/register.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminClientComponent } from './admin-client/admin-client.component';
import { combineLatest } from 'rxjs';
import { AdminAgencyComponent } from './admin-agency/admin-agency.component';
import { WorkerComponent } from './worker/worker.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ObjectComponent } from './object/object.component';
import { AgenciesComponent } from './agencies/agencies.component';
import { BusinessComponent } from './business/business.component';
import { AdminBusinessComponent } from './admin-business/admin-business.component';

const routes: Routes = [
  {path:"",component:InitialComponent},
  {path:"login",component:LoginComponent},
  {path:"klijent",component:ClientComponent},
  {path:"agencija",component:AgencyComponent},
  {path:"administrator",component:AdminComponent},
  {path:"login/admin",component:AdminLoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"change",component:ChangePasswordComponent},
  {path:"profile",component:ProfileComponent},
  {path:"admin-client",component:AdminClientComponent},
  {path:"admin-agency",component:AdminAgencyComponent},
  {path:"worker",component:WorkerComponent},
  {path:'reset',component:ResetPasswordComponent},
  {path:"object",component:ObjectComponent},
  {path:"agencies/:id",component:AgenciesComponent},
  {path:"business",component:BusinessComponent},
  {path:'admin-business',component:AdminBusinessComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
