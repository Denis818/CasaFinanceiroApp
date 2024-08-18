import { Observable, map } from 'rxjs';
import { ApiResponse } from 'src/app/shared/interfaces/api/api-response';
import { BaseService } from './base.service';

export abstract class CrudService<TEntity> extends BaseService {
  constructor(protected readonly url: string) {
    super();
  }

  public getAll(): Observable<TEntity[]> {
    return this.sendHttpRequest<ApiResponse<TEntity[]>>('GET', this.url).pipe(
      map((response) => response.dados)
    );
  }

  public insert(item: TEntity): Observable<TEntity> {
    return this.sendHttpRequest<ApiResponse<TEntity>>(
      'POST',
      this.url,
      item
    ).pipe(map((response) => response.dados));
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
