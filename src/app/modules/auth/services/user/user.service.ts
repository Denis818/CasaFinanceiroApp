import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, tap } from 'rxjs';
import { HttpRequestOptions } from 'src/app/core/interfaces/http-request-options.interface';
import { BaseService } from 'src/app/core/services/base/base.service';
import { EnumTipoSpinner } from 'src/app/shared/enums/enum-tipo-spinner';
import { ApiResponse } from 'src/app/shared/interfaces/api/api-response';
import { environment } from 'src/environments/environment';
import { UserRequest } from '../../interfaces/user/user-info-request.interface';
import { UserInfoResponse } from '../../interfaces/user/user-info-response.interface';
import { TokenResponse } from '../../interfaces/user/user-token-response.interface';

@Injectable({ providedIn: 'root' })
export class UserService extends BaseService {
  public readonly router = inject(Router);

  public url: string = `${environment.base_url_financy}/user`;

  constructor(private toastr: ToastrService) {
    super();
  }

  loginWithGoogle() {
    window.location.href = this.url + '/login-google';
  }

  handleAuthentication() {
    const options: HttpRequestOptions = {
      metodo: 'GET',
      url: this.url + '/handle-google-login',
      spinnerType: EnumTipoSpinner.loading,
    };

    this.sendHttpRequest<ApiResponse<TokenResponse>>(options)
      .pipe(
        tap((response) => {
          this.guardarToken(response.dados);
          this.getUserInfo();
        }),
        map((response: any) => response.dados)
      )
      .subscribe({
        next: (success) => {
          if (success?.authenticated) {
            this.toastr.success(`Bem vindo de volta!`);
            this.router.navigateByUrl('/portal/dashboard');
          }
        },
      });
  }

  login(user: UserRequest): void {
    this.sendHttpRequest<ApiResponse<TokenResponse>>({
      metodo: 'POST',
      url: this.url + '/login',
      dados: user,
    })
      .pipe(
        tap((response) => {
          this.guardarToken(response.dados);
          this.getUserInfo();
        }),
        map((response: any) => response.dados)
      )
      .subscribe({
        next: (success) => {
          if (success?.authenticated) {
            this.toastr.success(`Bem vindo de volta!`);
            this.router.navigateByUrl('/portal/dashboard');
          }
        },
      });
  }

  logout(): void {
    this.removeAuthLocalStorage();
    this.router.navigateByUrl('/login');
  }

  //  Support Methods
  private getUserInfo(): void {
    this.sendHttpRequest<ApiResponse<UserInfoResponse>>({
      metodo: 'GET',
      url: this.url + '/info',
    }).subscribe({
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

  removeAuthLocalStorage() {
    this.storageService.cleanAndPreserverItem(['grupoFaturaCode']);
  }
  //
}
