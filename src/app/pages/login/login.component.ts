import { AuthService } from '../../shared/services/auth.service';
import { Component, Renderer, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from '../../shared/services/notification.service';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {
  emailVerificationMessage: boolean = false;

  constructor(
    private renderer: Renderer,
    private router: Router,
    private notifier: NotificationService,
    private auth: AuthService
  ) {
    this.renderer.setElementClass(document.body, 'login', true);
  }

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.auth.login(email, password).subscribe(
      o => this.router.navigate(['/map']),
      err => this.notifier.display('error', err)
    );
  }

  ngOnDestroy() {
    this.renderer.setElementClass(document.body, 'login', false);
  }
}
