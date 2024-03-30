import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BaseService } from '../base/base.service';

@Injectable({ providedIn: 'root' })
export class UserService extends BaseService {
  //Comentario teste
  public url: string = `${this.urlBase}/api/Users`;
  public resposta: any = null;
  //Metodo Tap permite que você "faça algo" com os valores emitidos pelo Observable sem realmente modificá-los ou consumi-los.

  public login(dados: any): Observable<any> {
    return this.sendHttpRequest('POST', this.url + '/login', dados).pipe(
      tap((response) => {
        this.guardarToken(response.Dados);
        this.getUserInfo();
      })
    );
  }

  public logout(): Observable<any> {
    this.storageService.clear();
    return this.sendHttpRequest('GET', this.url + '/logout');
  }

  public getUserInfo(): void {
    this.sendHttpRequest<{
      dados: {
        email: string;
        isAdmin: boolean;
      };
    }>('GET', this.url + '/info').subscribe({
      next: (response) => {
        this.storageService.setItem('userEmail', response.dados.email);
        this.storageService.setItem(
          'isAdmin',
          response.dados.isAdmin.toString()
        );
      },
    });
  }

  private guardarToken(response: any) {
    if (response && response.Token && response.Expiration) {
      this.storageService.setItem('token', response.Token);
      this.storageService.setItem('expirationToken', response.Expiration);
    }
  }
}
