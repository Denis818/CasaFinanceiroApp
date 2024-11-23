import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize, map, Observable } from 'rxjs';
import { EnumTipoSpinner } from 'src/app/shared/enums/enum-tipo-spinner';
import { HttpRequestOptions } from '../../interfaces/http-request-options.interface';
import { StorageService } from '../storage/storage.service';
export abstract class BaseService {
  private readonly http: HttpClient = inject(HttpClient);
  readonly storageService: StorageService = inject(StorageService);

  //private readonly spinLoadService: SpinLoadService = inject(SpinLoadService);

  protected sendHttpRequest<T>(options: HttpRequestOptions): Observable<T> {
    if (!options.spinnerType) {
      options.spinnerType = EnumTipoSpinner.loading;
    }

    //this.spinLoadService.showSpinner(options.spinnerType);
    const requestResult = this.http.request<T>(options.metodo, options.url, {
      body: options.dados,
      params: options.params,
    });

    return requestResult.pipe(
      map((response) => {
        return response;
      }),

      finalize(() => {
        //this.spinLoadService.hideSpinner();
      })
    );
  }

  protected sendHttpRequestForDownload(
    url: string,
    spinnerType: EnumTipoSpinner = EnumTipoSpinner.downloading
  ): Observable<Blob> {
    //this.spinLoadService.showSpinner(spinnerType);

    const requestResult = this.http.request<Blob>('GET', url, {
      responseType: 'blob' as 'json',
    });

    return requestResult.pipe(
      map((response) => {
        return response;
      }),

      finalize(() => {
        //this.spinLoadService.hideSpinner();
      })
    );
  }
}
