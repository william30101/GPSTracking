import { D3Helper } from './services/d3-helper.service';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AuthService } from './services/auth.service';
import { AngularFireModule } from 'angularfire2';
import { AuthGuard } from './services/auth.guard';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PopoverModule } from 'ngx-bootstrap/popover';
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
import { ModalModule } from 'ngx-bootstrap/modal';
import {ModalHelperService} from "./services/modal-helper.service";
import {ConfirmPopupComponent} from "../pages/device/confirm-popup.component";

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const SHARED_COMPONENTS = [
  FooterComponent,
  SidebarMenuComponent,
  TopNavComponent
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    BsDropdownModule.forRoot(),
    PopoverModule.forRoot(),
    ModalModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    // AngularFireModule.initializeApp(firebaseConfig),
  ],
  providers: [
    GlobalState,
    AuthService,
    AuthGuard,
    FirebaseApiService,
    UserService,
    NotificationService,
    D3Helper,
    ModalHelperService
  ],
  declarations: [
    ...SHARED_COMPONENTS
  ],
  entryComponents: [
    ConfirmPopupComponent
  ],
  exports: [
    ...SHARED_COMPONENTS,
    HttpClientModule,
    TranslateModule,
    BsDropdownModule,
    PopoverModule,
    ModalModule
  ]
})
export class SharedModule { }
