import { GlobalState } from './../global.state';
import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {Router} from '@angular/router';
import {FirebaseApiService} from '../firebase-api.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss']
})
export class SidebarMenuComponent implements OnInit {

  public isMenuCollapsed: boolean = false;
  isLoggedIn: boolean = false;
  name: string;
  email: string;
  uid: string;


  public navs = [{
    path: '/dashboard',
    title: 'Dashboard',
    class: 'fa fa-dashboard'
  }, {
    path: '/map',
    title: 'Map',
    class: 'fa fa-map'
  }];

  constructor( private user: UserService,
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


}
