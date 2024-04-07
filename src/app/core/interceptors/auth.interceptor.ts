import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Observable, of, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { StorageService } from './../services/storage/storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private unauthorizedErrorCount = 0;
  private requestCount = 0;

  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private readonly storageService: StorageService
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.storageService.getItem('token');

    const authReq = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + token),
    });

    this.requestCount++;
    this.spinner.show();

    return next.handle(authReq).pipe(
      tap((event) => this.haveMessages(event)),
      catchError((error: HttpErrorResponse) => {
        this.error(error?.error?.mensagens);
        this.checkTokenExpired(error);
        return throwError(() => of(error));
      }),
      finalize(() => {
        this.requestCount--;
        if (this.requestCount === 0) this.spinner.hide();
      })
    );
  }

  public error(arrayMessages: any): void {
    if (arrayMessages?.length > 0) {
      arrayMessages.forEach((mensagem: any) => {
        this.toastr.error(mensagem.descricao, 'Erro');
      });
    } else {
      this.toastr.error('Ocorreu um erro, tente novamente.', 'Erro');
    }
  }

  public checkTokenExpired(error: any) {
    if (error.status === 401) {
      this.unauthorizedErrorCount++;

      if (this.unauthorizedErrorCount >= 2) {
        this.router.navigate(['/login']);
        this.unauthorizedErrorCount = 0;
      }
    } else {
      this.unauthorizedErrorCount = 0;
    }
  }

  public haveMessages(event: any) {
    if (event?.body?.mensagens) {
      event.body.mensagens.forEach((mensagem: any) => {
        if (mensagem.statusCode === 200 && mensagem.descricao) {
          this.toastr.warning(mensagem.descricao, 'Aviso');
        }
      });
    }
  }
}
