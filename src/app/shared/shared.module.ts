import { AuthService } from './services/auth.service';
import { AngularFireModule } from 'angularfire2';
import { AuthGuard } from './services/auth.guard';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CommonModule } from '@angular/common';
import { FirebaseApiService } from './services/firebase-api.service';
import { FooterComponent } from './footer/footer.component';
import { GlobalState } from './global.state';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarMenuComponent } from './sidebar-menu/sidebar-menu.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { UserService } from './services/user.service';
import { NotificationService } from './services/notification.service';


const SHARED_COMPONENTS = [
  FooterComponent,
  SidebarMenuComponent,
  TopNavComponent
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    BsDropdownModule.forRoot(),
    // AngularFireModule.initializeApp(firebaseConfig),
  ],
  providers: [
    GlobalState,
    AuthService,
    AuthGuard,
    FirebaseApiService,
    UserService,
    NotificationService
  ],
  declarations: [
    ...SHARED_COMPONENTS
  ],
  exports: [
    ...SHARED_COMPONENTS
  ]
})
export class SharedModule { }
