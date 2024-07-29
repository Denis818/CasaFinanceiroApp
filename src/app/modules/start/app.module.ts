import { CommonModule } from '@angular/common';

import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

import { NgModule } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from 'src/app/core/core.module';
import { PortalModule } from 'src/app/core/portal/portal.module';
import { AuthModule } from '../auth/auth.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    PortalModule,
    AuthModule,
    CoreModule,
    AppRoutingModule,
    CommonModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    BrowserModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      progressBar: true,
    }),
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        floatLabel: 'always',
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
