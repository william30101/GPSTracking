import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { FirebaseApiService } from './firebase-api.service';
import { UserService } from './user.service';
import 'rxjs/add/operator/take';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {

  private isLoginSubject: Subject<boolean>;

  constructor(
    private firebaseAPI: FirebaseApiService,
    private user: UserService
  ) {
    this.isLoginSubject = new Subject();
  }

  login(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password).then(user => {
      if (user.emailVerified) {
        return this.firebaseAPI.getUserFromDatabase(user.uid);
      } else {
        this.logout();
        this.isLoginSubject.error(new Error('The email is not verified'));
      }
    }).then(userFromDatabase => {
      if (userFromDatabase) {
        this.user.set(userFromDatabase);
      }
      this.isLoginSubject.next(true);
    }).catch(err => {
      this.isLoginSubject.error(err);
    });
    return this.isLoggedIn();
  }

  logout() {
    console.log('logout');
    this.user.destroy();
    firebase.auth().signOut().catch(err => {
      console.log('signout err ' + err);
    });
  }

  isAuthStatesChanged() {
    firebase.auth().onAuthStateChanged(userData => {
      if (userData && userData.emailVerified) {
        this.firebaseAPI.getUserFromDatabase(userData.uid).then(userDataFromDatabase => {
          this.user.set(userDataFromDatabase);
          this.isLoginSubject.next(true);
        }).catch(() => this.isLoginSubject.next(false));
      } else {
        this.isLoginSubject.next(false);
      }
    });
    return this.isLoggedIn();
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLoginSubject.asObservable().take(1);
  }
}
