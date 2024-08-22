import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { EnumTipoSpinner } from 'src/app/shared/enums/enum-tipo-spinner';
import { HttpRequestOptions } from '../../interfaces/http-request-options.interface';
import { SpinLoadService } from '../spinner/spin-load.service';
import { StorageService } from '../storage/storage.service';
export abstract class BaseService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly spinLoadService: SpinLoadService = inject(SpinLoadService);
  readonly storageService: StorageService = inject(StorageService);

  protected sendHttpRequest<T>(options: HttpRequestOptions): Observable<T> {
    const {
      metodo,
      url,
      dados,
      params,
      spinnerType = EnumTipoSpinner.loading,
    } = options;

    this.spinLoadService.showSpinner(spinnerType);
    const requestResult = this.http.request<T>(metodo, url, {
      body: dados,
      params: params,
    });
    return requestResult.pipe(
      map((response) => {
        this.spinLoadService.hideSpinner();
        return response;
      })
    );
  }

  protected sendHttpRequestForDownload(
    url: string,
    spinnerType: EnumTipoSpinner = EnumTipoSpinner.downloading
  ): Observable<Blob> {
    this.spinLoadService.showSpinner(spinnerType);

    const requestResult = this.http.request<Blob>('GET', url, {
      responseType: 'blob' as 'json',
    });

    return requestResult.pipe(
      map((response) => {
        this.spinLoadService.hideSpinner();
        return response;
      })
    );
  }
}
