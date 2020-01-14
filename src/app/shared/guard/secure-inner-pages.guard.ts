import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from "src/app/admin/services/auth/auth.service";


@Injectable({
  providedIn: 'root'
})
export class SecureInnerPagesGuard implements CanActivate {

  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // If admin is logged in, prevent access to sign-in, sign-up, forget-password and verify-email pages, and route to admin dashboard page
    if (this.authService.isLoggedIn) {
      this.router.navigate(['dashboard'])
    }
    return true;
  }

}

