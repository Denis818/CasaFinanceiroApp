import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthCallbackComponent } from './components/auth-callback/auth-callback.component';
import { OauthGoogleComponent } from './components/oauth-google/oauth-google.component';
import { LoginPage } from './pages/login/login.page';

@NgModule({
  declarations: [LoginPage, AuthCallbackComponent, OauthGoogleComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    AuthRoutingModule,
  ],
})
export class AuthModule {}
