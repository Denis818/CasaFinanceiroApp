import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { BaseService } from 'src/app/core/services/base/base.service';
import { environment } from 'src/app/environments/enviroment';
import { ApiResponse } from 'src/app/shared/interfaces/api/api-response';
import { UserRequest } from '../../interfaces/user/user-info-request.interface';
import { UserInfoResponse } from '../../interfaces/user/user-info-response.interface';
import { TokenResponse } from '../../interfaces/user/user-token-response.interface';

@Injectable({ providedIn: 'root' })
export class UserService extends BaseService {
  public readonly router = inject(Router);

  public url: string = `${environment.base_url_financy}/api/Users`;

  login(user: UserRequest): void {
    this.sendHttpRequest<ApiResponse<TokenResponse>>(
      'POST',
      this.url + '/login',
      user
    )
      .pipe(
        tap((response) => {
          this.guardarToken(response.dados);
          this.getUserInfo();
        })
      )
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/home');
        },
      });
  }

  logout(): void {
    this.sendHttpRequest('GET', this.url + '/logout').subscribe({
      next: () => {
        this.storageService.clear();
        this.router.navigateByUrl('/login');
      },
    });
  }

  //  Support Methods
  private getUserInfo(): void {
    this.sendHttpRequest<ApiResponse<UserInfoResponse>>(
      'GET',
      this.url + '/info'
    ).subscribe({
      next: (response) => {
        this.storageService.setItem('userEmail', response.dados.email);
        this.storageService.setItem(
          'isAdmin',
          response.dados.isAdmin.toString()
        );
      },
    });
  }

  private guardarToken(response: TokenResponse) {
    if (response && response.token && response.expiration) {
      this.storageService.setItem('token', response.token);
      this.storageService.setItem(
        'expirationToken',
        response.expiration.toString()
      );
    }
  }
  //
}