import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import * as firebase from 'firebase';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Injectable()
export class AuthGuard implements CanActivate {
  private loggedInSubject: ReplaySubject<any>;

  constructor(private router: Router) {
    this.loggedInSubject = new ReplaySubject(1);
    firebase.auth().onAuthStateChanged(this.loggedInSubject);
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.loggedInSubject.map(user => {
      if (!user) {
        this.router.navigate(['/login']);
      }
      // console.log('Authenticated?', !!user);
      return !!user;
    }).take(1);
  }
}
