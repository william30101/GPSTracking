import { agmConfig } from './app.conf';
import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MapComponent } from './pages/map/map.component';
import { LayoutComponent } from './layout/layout.component';
import { FormsModule} from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { DeviceComponent } from './pages/device/device.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { RegisterComponent } from './pages/register/register.component';
import { NotificationComponent } from './pages/notification/notification.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    MapComponent,
    LayoutComponent,
    DeviceComponent,
    RegisterComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    Ng2SmartTableModule,
    AgmCoreModule.forRoot(agmConfig),
    TranslateModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
