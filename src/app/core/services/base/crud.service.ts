import { inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiResponse } from 'src/app/shared/interfaces/api/api-response';
import { SpinLoadService } from 'src/app/shared/services/spin-load.service';
import { BaseService } from './base.service';

export abstract class CrudService<TEntity> extends BaseService {
  private spinLoadService: SpinLoadService = inject(SpinLoadService);

  constructor(protected readonly url: string) {
    super();
  }

  public getAll(): Observable<TEntity[]> {
    return this.sendHttpRequest<ApiResponse<TEntity[]>>('GET', this.url).pipe(
      map((response) => response.dados)
    );
  }

  public insert(item: TEntity): Observable<TEntity> {
    this.spinLoadService.enableSpinLoad = true;
    return this.sendHttpRequest<ApiResponse<TEntity>>(
      'POST',
      this.url,
      item
    ).pipe(
      map((response) => {
        this.spinLoadService.enableSpinLoad = false;
        return response.dados;
      })
    );
  }

  public update(code: string, item: TEntity): Observable<TEntity> {
    return this.sendHttpRequest<ApiResponse<TEntity>>(
      'PUT',
      `${this.url}/?code=${code}`,
      item
    ).pipe(map((response) => response.dados));
  }

  public delete(code: string): Observable<boolean> {
    return this.sendHttpRequest<ApiResponse<boolean>>(
      'DELETE',
      `${this.url}/?code=${code}`
    ).pipe(map((response) => response.dados));
  }
}
