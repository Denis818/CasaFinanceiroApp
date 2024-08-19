import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import player from 'lottie-web';
import { provideLottieOptions } from 'ngx-lottie';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { CoreModule } from 'src/app/core/core.module';
import { PortalModule } from 'src/app/core/portal/portal.module';
import { AuthModule } from '../auth/auth.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    NgxSpinnerModule,
    PortalModule,
    AuthModule,
    CoreModule,
    AppRoutingModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      progressBar: true,
    }),
  ],
  providers: [
    provideLottieOptions({
      player: () => player,
    }),
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Adicione este schema para reconhecer 'ng-lottie'
})
export class AppModule {}
