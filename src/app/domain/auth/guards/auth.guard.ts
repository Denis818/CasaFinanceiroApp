import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { StorageService } from '../../../core/services/storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  public readonly storageService = inject(StorageService);
  public readonly router = inject(Router);

  canMatch(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = this.storageService.getItem('token');
    const expiration = this.storageService.getItem('expirationToken');

    if (token && expiration) {
      const expirationDate = new Date(expiration);
      const now = new Date();

      const nowUTC = new Date(
        Date.UTC(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          now.getHours(),
          now.getMinutes(),
          now.getSeconds()
        )
      );

      if (expirationDate <= nowUTC) {
        this.resetLocalStorage();
        this.router.navigateByUrl('/login');
        return false;
      }
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
    return true;
  }

  private resetLocalStorage(): void {
    this.storageService.cleanAndPreserverItem(['grupoDespesasId']);
  }
}
