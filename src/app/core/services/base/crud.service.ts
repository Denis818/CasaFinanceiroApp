import { Observable, map } from 'rxjs';
import { EnumTipoSpinner } from 'src/app/shared/enums/enum-tipo-spinner';
import { ApiResponse } from 'src/app/shared/interfaces/api/api-response';
import { BaseService } from './base.service';

export abstract class CrudService<TEntity> extends BaseService {
  constructor(protected readonly url: string) {
    super();
  }

  public getAll(): Observable<TEntity[]> {
    return this.sendHttpRequest<ApiResponse<TEntity[]>>({
      metodo: 'GET',
      url: this.url,
    }).pipe(map((response) => response.dados));
  }

  public insert(item: TEntity): Observable<TEntity> {
    return this.sendHttpRequest<ApiResponse<TEntity>>({
      metodo: 'POST',
      url: this.url,
      dados: item,
    }).pipe(
      map((response) => {
        return response.dados;
      })
    );
  }

  public update(code: string, item: TEntity): Observable<TEntity> {
    return this.sendHttpRequest<ApiResponse<TEntity>>({
      metodo: 'PUT',
      url: `${this.url}/?code=${code}`,
      dados: item,
      spinnerType: EnumTipoSpinner.saving,
    }).pipe(map((response) => response.dados));
  }

  public delete(code: string): Observable<boolean> {
    return this.sendHttpRequest<ApiResponse<boolean>>({
      metodo: 'DELETE',
      url: `${this.url}/?code=${code}`,
    }).pipe(map((response) => response.dados));
  }
}
