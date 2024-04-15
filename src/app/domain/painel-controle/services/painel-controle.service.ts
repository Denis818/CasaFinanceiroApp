import { HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { BaseService } from 'src/app/core/services/base/base.service';
import { environment } from 'src/app/environments/enviroment';
import { ApiResponse } from 'src/app/shared/interfaces/api/api-response';
import { Despesa } from '../interfaces/despesa.interface';
import { PaginationResponse } from '../../../shared/utilities/paginator/pagination-response.interface';

@Injectable({ providedIn: 'root' })
export class PainelControleService extends BaseService {
  public readonly router = inject(Router);
  public url: string = `${environment.base_url_financy}`;

  public getAllDespesas(
    paginaAtual: number,
    itensPorPagina: number
  ): Observable<PaginationResponse<Despesa>> {
    const params = new HttpParams()
      .set('paginaAtual', paginaAtual.toString())
      .set('itensPorPagina', itensPorPagina.toString());

    return this.sendHttpRequest<ApiResponse<PaginationResponse<Despesa>>>(
      'GET',
      `${this.url}/Despesa`,
      null,
      params
    ).pipe(map((response) => response.dados));
  }

  public getAll<TEntity>(uri: string): Observable<TEntity[]> {
    const url = `${this.url}/${uri}`;
    return this.sendHttpRequest<ApiResponse<TEntity[]>>('GET', url).pipe(
      map((response) => response.dados)
    );
  }

  public insert<TEntity>(entity: TEntity, uri: string) {
    const url = `${this.url}/${uri}`;
    return this.sendHttpRequest('POST', url, entity);
  }

  public update<TEntity>(id: number, entity: TEntity, uri: string) {
    const url = `${this.url}/${uri}/?id=${id}`;
    return this.sendHttpRequest('PUT', url, entity);
  }

  public delete(id: number, uri: string) {
    const url = `${this.url}/${uri}/?id=${id}`;
    return this.sendHttpRequest('DELETE', url);
  }
}
