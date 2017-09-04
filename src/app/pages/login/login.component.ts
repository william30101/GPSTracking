import { UserService } from './../../shared/services/user.service';
import { FirebaseApiService } from './../../shared/services/firebase-api.service';
import { Component, OnInit, Renderer, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { NotificationService } from '../../shared/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  emailVerificationMessage: boolean = false;

  constructor(private renderer: Renderer,
    private fire: FirebaseApiService,
    private user: UserService,
    private router: Router,
    private notifier: NotificationService
  ) {
    this.renderer.setElementClass(document.body, 'login', true);
  }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => {
        if (!user.emailVerified) {
          this.emailVerificationMessage = true;
          this.logout();
          return null;
        } else {
          return this.fire.getUserFromDatabase(user.uid);
        }

      })
      .then(userFromDatabase => {
        if (userFromDatabase) {
          this.user.set(userFromDatabase);
          this.router.navigate(['/map']);
        }

      })
      .catch(err => {
        this.notifier.display('error', err);
      });

  }


  ngOnDestroy() {
    this.renderer.setElementClass(document.body, 'login', false);
  }


  logout() {
    firebase.auth().signOut()
      .catch(err => {
        // this.notifier.display('error', err);
        console.log('signout err ' + err);
      });
  }


}
