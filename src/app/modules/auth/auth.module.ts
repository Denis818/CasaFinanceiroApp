import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { LoginPage } from './pages/login/login.page';
import { AppRoutingModule } from '../start/app-routing.module';
import { OauthGoogleComponent } from './components/oauth-google/oauth-google.component';

@NgModule({
  declarations: [LoginPage, OauthGoogleComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class AuthModule {}
