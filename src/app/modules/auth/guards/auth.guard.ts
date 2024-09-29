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

    if (token) {
      return true;
    } else {
      this.router.navigateByUrl('auth/login');
      return false;
    }
  }
}
