import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SideNavComponent } from './components/sidenav/sidenav.component';
import { PortalPage } from './pages/portal/portal.page';
import { PortalRoutingModule } from './portal-routing.module';

@NgModule({
  declarations: [NavbarComponent, SideNavComponent, PortalPage],
  imports: [
    PortalRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSelectModule,
    MatButtonModule,
    MatTooltipModule,
  ],
})
export class PortalModule {}
