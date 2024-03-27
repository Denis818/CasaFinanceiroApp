import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BaseService } from './base/BaseService';

@Injectable({ providedIn: 'root' })
export class UserService extends BaseService {
  //Comentario teste
  public url: string = `${this.urlBase}/api/Users`;

  public resposta: any = null;

  constructor(http: HttpClient) {
    super(http);
  }

  //Metodo Tap permite que você "faça algo" com os valores emitidos pelo Observable sem realmente modificá-los ou consumi-los.

  public login(dados: any): Observable<any> {
    return this.SendHttpRequest('POST', this.url + '/login', dados).pipe(
      tap((response) => {
        debugger;
        this.guardarToken(response.Dados);
        this.getUserInfo();
      })
    );
  }

  public logout(): Observable<any> {
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('expirationToken');
    return this.SendHttpRequest('GET', this.url + '/logout');
  }

  public getUserInfo(): void {
    this.SendHttpRequest('GET', this.url + '/info').subscribe({
      next: (response) => {
        localStorage.setItem('userEmail', response.Dados.Email);
        localStorage.setItem('isAdmin', response.Dados.IsAdmin);
      },
      error: (error) => {
        throw new Error(error);
      },
    });
  }

  private guardarToken(response: any) {
    if (response && response.Token && response.Expiration) {
      localStorage.setItem('token', response.Token);
      localStorage.setItem('expirationToken', response.Expiration);
    }
  }
}
