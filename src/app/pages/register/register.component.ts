import { Component, OnInit, Renderer, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  constructor(
    private renderer: Renderer
  ) {
    this.renderer.setElementClass(document.body, 'login', true);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.renderer.setElementClass(document.body, 'login', false);
  }
}
