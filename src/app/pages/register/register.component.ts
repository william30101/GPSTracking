import { Component, OnInit, Renderer, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as firebase from 'firebase';
import {NotificationService} from "../../shared/services/notification.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  displayVerificationMessage: boolean = false;

  constructor(
    private renderer: Renderer,
    private notifier: NotificationService) {
    this.renderer.setElementClass(document.body, 'login', true);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.renderer.setElementClass(document.body, 'login', false);
  }

  onSubmit(form: NgForm) {

    const name = form.value['username'];
    const email = form.value.email;
    const password = form.value.password;

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(userData => {

        userData.sendEmailVerification();

        this.displayVerificationMessage = true;

        return firebase.database().ref('users/' + userData.uid).set({
          email: email,
          uid: userData.uid,
          registrationDate: new Date().toString(),
          name: name
        });


      })
      .catch(err => {
        this.notifier.display('error', err);
      });


  }
}
