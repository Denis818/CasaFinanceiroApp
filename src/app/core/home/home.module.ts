import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SideNavComponent } from './components/side-nav/sidenav.component';
import { HomePage } from './pages/home/home.page';
import { AppRoutingModule } from 'src/app/modules/start/app-routing.module';

@NgModule({
  declarations: [NavbarComponent, SideNavComponent, HomePage],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatButtonModule,
    MatTooltipModule,
  ],
})
export class HomeModule {}
