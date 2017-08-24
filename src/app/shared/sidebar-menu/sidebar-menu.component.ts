import { GlobalState } from './../global.state';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss']
})
export class SidebarMenuComponent implements OnInit {

  public isMenuCollapsed: boolean = false;

  public navs = [{
    path: '/dashboard',
    title: 'Dashboard',
    class: 'fa fa-bar-chart-o'
  }, {
    path: '/map',
    title: 'Map',
    class: 'fa fa-laptop'
  }];

  constructor() { }

  ngOnInit() {
  }


}
