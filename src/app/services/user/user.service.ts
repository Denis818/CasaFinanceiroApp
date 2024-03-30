import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BaseService } from '../base/base.service';

@Injectable({ providedIn: 'root' })
export class UserService extends BaseService {
  public url: string = `${this.urlBase}/api/Users`;
  public resposta: any = null;

  public login(dados: any): Observable<any> {
    return this.sendHttpRequest('POST', this.url + '/login', dados).pipe(
      tap((response) => {
        this.guardarToken(response.dados);
        this.getUserInfo();
      })
    );
  }

  public logout(): Observable<any> {
    this.storageService.clear();
    return this.sendHttpRequest('GET', this.url + '/logout');
  }

  public getUserInfo(): void {
    this.sendHttpRequest('GET', this.url + '/info').subscribe({
      next: (response: any) => {
        this.storageService.setItem('userEmail', response.dados.email);
        this.storageService.setItem(
          'isAdmin',
          response.dados.isAdmin.toString()
        );
      },
    });
  }

  private guardarToken(response: any) {
    if (response && response.token && response.expiration) {
      this.storageService.setItem('token', response.token);
      this.storageService.setItem('expirationToken', response.expiration);
    }
  }
}
