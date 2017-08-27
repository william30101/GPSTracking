import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MapComponent } from './pages/map/map.component';
import { LayoutComponent } from './layout/layout.component';
import { FirebaseApiService } from './shared/firebase-api.service';
import { UserService } from './shared/user.service';
import { FormsModule} from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { DeviceComponent } from './pages/device/device.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    MapComponent,
    LayoutComponent,
    DeviceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    Ng2SmartTableModule,
    AgmCoreModule.forRoot({
      apiKey: '********'
    })
  ],
  providers: [FirebaseApiService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
