import { NavigationEnd, Router } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';

const TOP_PADDING = 141;

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  @ViewChild('main') el: ElementRef;

  public height: number;

  constructor(private router: Router, private renderer: Renderer) {
    this.height = window.outerHeight - TOP_PADDING;
  }

  ngOnInit() {
    this.router.events.subscribe((event: NavigationEnd) => {
      this.height = window.outerHeight - TOP_PADDING;
    });
  }

}
