import { GlobalState } from './global.state';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarMenuComponent } from './sidebar-menu/sidebar-menu.component';
import { FooterComponent } from './footer/footer.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

const SHARED_COMPONENTS = [
  FooterComponent,
  SidebarMenuComponent,
  TopNavComponent
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    BsDropdownModule.forRoot()
  ],
  providers: [GlobalState, AuthGuard],
  declarations: [
    ...SHARED_COMPONENTS
  ],
  exports: [
    ...SHARED_COMPONENTS
  ]
})
export class SharedModule { }
