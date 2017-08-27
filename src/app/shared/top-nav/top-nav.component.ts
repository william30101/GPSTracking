import { FirebaseApiService } from './../services/firebase-api.service';
import { UserService } from './../services/user.service';
import { GlobalState } from './../global.state';
import { Component, OnInit, Renderer } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {
  public isMenuCollapsed = false;
  isLoggedIn: boolean = false;
  name: string;
  email: string;
  uid: string;

  constructor(private renderer: Renderer,
    private _state: GlobalState,
    private user: UserService,
    private router: Router,
    private fire: FirebaseApiService) { }

  ngOnInit() {

    this.user.statusChange.subscribe(userData => {
      if (userData) {
        this.isLoggedIn = true;
        this.name = userData.name;
        this.email = userData.email;
        this.uid = userData.uid;
      } else {
        this.isLoggedIn = false;
        this.name = null;
        this.email = null;
        this.uid = null;
      }

    });

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

  public toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);

    this.renderer.setElementClass(document.body, 'nav-md', !this.isMenuCollapsed);
    this.renderer.setElementClass(document.body, 'nav-sm', this.isMenuCollapsed);
  }

  public logout() {
    firebase.auth().signOut()
      .catch(err => {
        // this.notifier.display('error', err);
        console.log('signout err ' + err);
      });
  }
}
