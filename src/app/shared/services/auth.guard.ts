import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private auth: AuthService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.isAuthStatesChanged().map(isLoggedIn => {
      if (!isLoggedIn) {
        this.router.navigate(['/login']);
      }
      // console.log('Authenticated?', isLoggedIn);
      return isLoggedIn;
    });
  }
}
