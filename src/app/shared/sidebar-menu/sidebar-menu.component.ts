import { FirebaseApiService } from './../services/firebase-api.service';
import { UserService } from './../services/user.service';
import { GlobalState } from './../global.state';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import {AuthService} from '../services/auth.service';

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
    title: 'Menu.Dashboard',
    class: 'fa fa-dashboard'
  }, {
    path: '/map',
    title: 'Menu.Map',
    class: 'fa fa-map'
  }, {
    path: '/device',
    title: 'Menu.Device',
    class: 'fa fa-mobile-phone'
  }];

  constructor(private user: UserService,
    private router: Router,
    private fire: FirebaseApiService,
    private auth: AuthService) { }

  ngOnInit() {
  }


}
