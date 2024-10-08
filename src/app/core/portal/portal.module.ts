import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AppRoutingModule } from 'src/app/modules/start/app-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SideNavComponent } from './components/sidenav/sidenav.component';
import { PortalPage } from './pages/portal/portal.page';

@NgModule({
  declarations: [NavbarComponent, SideNavComponent, PortalPage],
  imports: [
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatIconModule,
    MatSelectModule,
    MatButtonModule,
    MatTooltipModule,
    MatMenuModule,
  ],
})
export class PortalModule {}
