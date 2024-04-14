import { HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { BaseService } from 'src/app/core/services/base/base.service';
import { environment } from 'src/app/environments/enviroment';
import { ApiResponse } from 'src/app/shared/interfaces/api/api-response';
import { Despesa } from '../interfaces/dashboard/despesa.interface';

@Injectable({ providedIn: 'root' })
export class DashboardService extends BaseService {
  public readonly router = inject(Router);
  public url: string = `${environment.base_url_financy}/api`;

  public getAllDespesas(
    paginaAtual: number,
    itensPorPagina: number
  ): Observable<Despesa[]> {
    const params = new HttpParams()
      .set('paginaAtual', paginaAtual.toString())
      .set('itensPorPagina', itensPorPagina.toString());

    return this.sendHttpRequest('GET', `${this.url}/Despesa`, null, params);
  }

  public getAll<TEntity>(uri: string): Observable<TEntity[]> {
    const url = `${this.url}/${uri}}`;
    return this.sendHttpRequest<ApiResponse<TEntity[]>>('GET', url).pipe(
      map((response) => response.dados)
    );
  }

  public insert<TEntity>(entity: TEntity, uri: string): void {
    const url = `${this.url}/${uri}}`;
    this.sendHttpRequest('POST', url, entity);
  }

  public update<TEntity>(id: number, entity: TEntity, uri: string): void {
    const url = `${this.url}/${uri}}`;
    this.sendHttpRequest('PUT', url, entity);
  }

  public delete(id: number, uri: string): void {
    const url = `${this.url}/${uri}}`;
    this.sendHttpRequest('DELETE', url + `?id=${id}`);
  }
}
