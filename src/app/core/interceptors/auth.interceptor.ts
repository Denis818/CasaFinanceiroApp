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
import { StorageService } from 'src/app/core/services/storage/storage.service';

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
    let faturaId = this.storageService.getItem('grupoFaturaId');
    faturaId = faturaId && parseInt(faturaId) !== 0 ? faturaId : null;

    let headers = req.headers.set('Authorization', `Bearer ${token}`);

    if (faturaId) {
      headers = headers.set('grupo-fatura-id', faturaId);
    }

    const authReq = req.clone({ headers });

    this.requestCount++;
    this.spinner.show();

    return next.handle(authReq).pipe(
      tap((event) => this.haveMessagesNotification(event)),
      catchError((error: HttpErrorResponse) => {
        this.errorNotification(error?.error?.mensagens);
        this.checkTokenExpired(error);
        return throwError(() => of(error));
      }),
      finalize(() => {
        this.requestCount--;
        if (this.requestCount === 0) this.spinner.hide();
      })
    );
  }

  public errorNotification(arrayMessages: any): void {
    if (arrayMessages?.length > 0) {
      arrayMessages.forEach((mensagem: any) => {
        if (mensagem.statusCode === 401 && mensagem.descricao) {
          this.toastr.warning(mensagem.descricao, 'Acesso Negado');
        } else if (mensagem.statusCode === 404 && mensagem.descricao) {
          this.toastr.error(mensagem.descricao, 'Não Encontrado');
        } else {
          this.toastr.error(mensagem.descricao, 'Erro');
        }
      });
    } else {
      this.toastr.error('Ocorreu um erro, tente novamente.', 'Erro');
    }
  }

  public checkTokenExpired(error: any) {
    if (error.status === 401) {
      this.unauthorizedErrorCount++;

      if (this.unauthorizedErrorCount >= 3) {
        this.router.navigate(['/login']);
        this.unauthorizedErrorCount = 0;
      }
    } else {
      this.unauthorizedErrorCount = 0;
    }
  }

  public haveMessagesNotification(event: any) {
    if (event?.body?.mensagens) {
      event.body.mensagens.forEach((mensagem: any) => {
        if (mensagem.statusCode === 200 && mensagem.descricao) {
          this.toastr.warning(mensagem.descricao, 'Aviso');
        }
      });
    }
  }
}
