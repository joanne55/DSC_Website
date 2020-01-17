import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

// Custom components
import { SignInComponent } from '../admin/account/sign-in/sign-in.component';
import { SignUpComponent } from '../admin/account/sign-up/sign-up.component';
import { DashboardComponent } from '../admin/account/dashboard/dashboard.component';
import { ForgetPasswordComponent } from '../admin/account/forget-password/forget-password.component';
import { VerifyEmailComponent } from '../admin/account/verify-email/verify-email.component';

// Guards 
import { AuthGuard } from "./guard/auth.guard";
import { SecureInnerPagesGuard } from "./guard/secure-inner-pages.guard";


const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent, canActivate: [SecureInnerPagesGuard]},
  { path: 'sign-up', component: SignUpComponent, canActivate: [SecureInnerPagesGuard]},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'forgot-password', component: ForgetPasswordComponent, canActivate: [SecureInnerPagesGuard]},
  { path: 'verify-email', component: VerifyEmailComponent, canActivate: [SecureInnerPagesGuard, AuthGuard]}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }) 
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
