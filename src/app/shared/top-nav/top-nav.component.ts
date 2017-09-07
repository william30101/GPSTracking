import { FirebaseApiService } from './../services/firebase-api.service';
import { UserService } from './../services/user.service';
import { GlobalState } from './../global.state';
import { Component, OnInit, Renderer } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {
  public isMenuCollapsed = false;

  constructor(private renderer: Renderer,
    private _state: GlobalState,
    private user: UserService,
    private router: Router,
    private fire: FirebaseApiService,
    private auth: AuthService) { }

  ngOnInit() {
  }

  public toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);

    this.renderer.setElementClass(document.body, 'nav-md', !this.isMenuCollapsed);
    this.renderer.setElementClass(document.body, 'nav-sm', this.isMenuCollapsed);
  }

  public logout() {
    this.auth.logout();
  }
}
