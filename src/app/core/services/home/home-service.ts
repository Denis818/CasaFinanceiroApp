import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { ApiResponse } from 'src/app/shared/interfaces/api/api-response';
import { GrupoDespesa } from '../../interfaces/grupo-despesa.interface';
import { BaseService } from '../base/base.service';

@Injectable({ providedIn: 'root' })
export abstract class HomeService extends BaseService {
  public url: string = `${environment.base_url_financy}/grupo-despesa`;

  private reloadGruposDespesasInHomPage = new BehaviorSubject<boolean>(false);
  get realoadGrupoDespesas() {
    return this.reloadGruposDespesasInHomPage.asObservable();
  }

  public getAll(): Observable<GrupoDespesa[]> {
    return this.sendHttpRequest<ApiResponse<GrupoDespesa[]>>(
      'GET',
      this.url
    ).pipe(map((response) => response.dados));
  }

  public insert(entity: GrupoDespesa) {
    return this.sendHttpRequest('POST', this.url, entity).pipe(
      tap({
        next: () => {
          this.reloadGruposDespesasInHomPage.next(true);
        },
      })
    );
  }

  public update(id: number, entity: GrupoDespesa) {
    return this.sendHttpRequest('PUT', `${this.url}?id=${id}`, entity).pipe(
      tap({
        next: () => {
          this.reloadGruposDespesasInHomPage.next(true);
        },
      })
    );
  }

  public delete(id: number) {
    return this.sendHttpRequest('DELETE', `${this.url}?id=${id}`).pipe(
      tap({
        next: () => {
          this.reloadGruposDespesasInHomPage.next(true);
        },
      })
    );
  }
}
