import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InitialComponent } from './initial/initial.component';
import { LoginComponent } from './login/login.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminComponent } from './admin/admin.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ClientComponent } from './client/client.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { RegisterComponent } from './register/register.component';
import { AgencyComponent } from './agency/agency.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatMenuModule, matMenuAnimations} from '@angular/material/menu';
import {HttpClientModule} from '@angular/common/http';
import { ProfileComponent } from './profile/profile.component';
import { AdminClientComponent } from './admin-client/admin-client.component';
import { AdminAgencyComponent } from './admin-agency/admin-agency.component';
import { WorkerComponent } from './worker/worker.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ObjectComponent } from './object/object.component';
import { AgenciesComponent } from './agencies/agencies.component';
import { BusinessComponent } from './business/business.component';
import { AdminBusinessComponent } from './admin-business/admin-business.component';



@NgModule({
  declarations: [
    AppComponent,
    InitialComponent,
    LoginComponent,
    AdminLoginComponent,
    AdminComponent,
    ChangePasswordComponent,
    ClientComponent,
    FooterComponent,
    HeaderComponent,
    RegisterComponent,
    AgencyComponent,
    ProfileComponent,
    AdminClientComponent,
    AdminAgencyComponent,
    WorkerComponent,
    ResetPasswordComponent,
    ObjectComponent,
    AgenciesComponent,
    BusinessComponent,
    AdminBusinessComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatMenuModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
