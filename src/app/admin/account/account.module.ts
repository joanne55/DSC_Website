import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';



@NgModule({
  declarations: [
    DashboardComponent, 
    SignInComponent, 
    SignUpComponent, 
    ForgetPasswordComponent, 
    VerifyEmailComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AccountModule { }
