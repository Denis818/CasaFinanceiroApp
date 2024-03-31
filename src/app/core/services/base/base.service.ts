import { HttpClient, HttpParams } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from '../storage/storage.service';

export abstract class BaseService {
  private readonly http: HttpClient = inject(HttpClient);
  readonly storageService: StorageService = inject(StorageService);

  protected sendHttpRequest<T>(
    metodo: string,
    url: string,
    dados?: any,
    params?: HttpParams
  ): Observable<T> {
    return this.http.request<T>(metodo, url, {
      body: dados,
      params: params,
    });
  }
}
