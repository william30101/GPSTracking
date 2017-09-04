import { Injectable } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';
import * as firebase from 'firebase';
import {FirebaseApiService} from './firebase-api.service';
import {UserService} from './user.service';


@Injectable()
export class AuthService {

  isLoggedIn: boolean = false;


  constructor(private fire: FirebaseApiService,
              private user: UserService) { }

  login({ username, password }) {
    /**
     * Simulate a failed login to display the error
     * message for the login form.
     */
    if (username !== 'test') {
      return _throw('Invalid username or password');
    }

    return of({ name: 'User' });
  }

  logout() {
    return of(true);
  }

  isAuthStatesChanged() {
    firebase.auth().onAuthStateChanged(userData => {
      if (userData && userData.emailVerified) {
        if (this.isLoggedIn) {
          console.log('User is Logged in and menu options should be visible');
        } else {
          console.log('User is Logged in i.e never explicitly logged out but the state in our header is incorrect');
          this.fire.getUserFromDatabase(userData.uid)
            .then(userDataFromDatabase => {
              this.user.set(userDataFromDatabase);
              // this.router.navigate(["/allposts"]);
            });
        }
      }
    });
  }






}
