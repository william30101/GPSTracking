import { fallbackRoute } from './fallback-route';
import { LayoutComponent } from './layout/layout.component';
import { MapComponent } from './pages/map/map.component';
import { AuthGuard } from './shared/services/auth.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeviceComponent } from './pages/device/device.component';
import { RegisterComponent } from './pages/register/register.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full', canActivate: [AuthGuard] },
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
      { path: 'map', component: MapComponent, canActivate: [AuthGuard] },
      { path: 'device', component: DeviceComponent, canActivate: [AuthGuard] }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  fallbackRoute
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    // { enableTracing: true }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
