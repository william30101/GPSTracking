import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { FirebaseApiService } from './firebase-api.service';
import { UserService } from './user.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class AuthService {

  private isLoginSubject: BehaviorSubject<boolean>;

  constructor(
    private firebaseAPI: FirebaseApiService,
    private user: UserService
  ) {
    this.isLoginSubject = new BehaviorSubject(null);
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
    return this.isLoginSubject.asObservable();
  }

  logout() {
    firebase.auth().signOut().catch(err => {
      console.log('signout err ' + err);
    });
  }

  isAuthStatesChanged() {
    // firebase.auth().onAuthStateChanged(this.user$);
    // console.log(this.user$);
    firebase.auth().onAuthStateChanged(userData => {
      if (userData && userData.emailVerified) {
        console.log('User is Logged in i.e never explicitly logged out but the state in our header is incorrect');
        this.firebaseAPI.getUserFromDatabase(userData.uid)
          .then(userDataFromDatabase => {
            this.user.set(userDataFromDatabase);
            // this.router.navigate(["/allposts"]);
          });
      }
    });
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLoginSubject.asObservable();
  }
}
