import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLoginComponent } from './user-login.component';
import { UserLoginRoutingModule } from './user-login-routing.module';


@NgModule({
  declarations: [
    UserLoginComponent
  ],
  imports: [
    CommonModule,
    UserLoginRoutingModule
  ]
})
export class UserLoginModule { }
