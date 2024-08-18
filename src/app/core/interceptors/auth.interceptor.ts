import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
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
    let faturaCode =
      this.storageService.getItem('grupo-fatura-code') ??
      '00000000-0000-0000-0000-000000000000';

    let headers = req.headers.set('Authorization', `Bearer ${token}`);

    if (faturaCode) {
      headers = headers.set('grupo-fatura-code', faturaCode);
    }

    const authReq = req.clone({ headers });

    // Chama a função para mostrar o spinner apropriado
    this.showSpinner(req);

    return next.handle(authReq).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          this.haveMessagesNotification(event);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        this.errorNotification(error?.error?.mensagens);
        this.checkTokenExpired(error);
        return throwError(() => of(error));
      }),
      finalize(() => {
        this.requestCount--;
        if (this.requestCount === 0) {
          if (req.method === 'GET') {
            this.spinner.hide('loadingSpinner');
          } else if (['POST', 'PUT', 'DELETE'].includes(req.method)) {
            this.spinner.hide('savingSpinner');
          }
        }
      })
    );
  }

  public errorNotification(arrayMessages: any): void {
    if (arrayMessages?.length > 0) {
      arrayMessages.forEach((mensagem: any) => {
        if (mensagem.statusCode === 401 && mensagem.descricao) {
          this.toastr.warning(mensagem.descricao, 'Acesso Negado');
        } else if (mensagem.statusCode === 404 && mensagem.descricao) {
          this.toastr.warning(mensagem.descricao, 'Não Encontrado');
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

  private showSpinner(req: HttpRequest<any>): void {
    this.requestCount++;

    if (req.method === 'GET') {
      this.spinner.show('loadingSpinner');
    } else if (['POST', 'PUT', 'DELETE'].includes(req.method)) {
      this.spinner.show('savingSpinner');
    }
  }
}
