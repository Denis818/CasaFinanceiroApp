import { HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { BaseService } from 'src/app/core/services/base/base.service';
import { environment } from 'src/app/environments/environment';
import { ApiResponse } from 'src/app/shared/interfaces/api/api-response';
import { PaginationResponse } from '../../../shared/utilities/paginator/pagination-response.interface';
import { Despesa } from '../interfaces/despesa.interface';

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
      `${this.url}/despesa`,
      null,
      params
    ).pipe(map((response) => response.dados));
  }

  public filtrarDespesaPorItem(filterItem: string): Observable<Despesa[]> {
    return this.sendHttpRequest<ApiResponse<Despesa[]>>(
      'GET',
      `${this.url}/despesa/filter-by-item?filterItem=${filterItem}`
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
    return this.sendHttpRequest('POST', url, entity).pipe(
      map((response: any) => response.dados)
    );
  }

  public update<TEntity>(id: number, entity: TEntity, uri: string) {
    const url = `${this.url}/${uri}/?id=${id}`;
    return this.sendHttpRequest('PUT', url, entity).pipe(
      map((response: any) => response.dados)
    );
  }

  public delete(id: number, uri: string) {
    const url = `${this.url}/${uri}/?id=${id}`;
    return this.sendHttpRequest('DELETE', url).pipe(
      map((response: any) => response.dados)
    );
  }

  public conferirFaturaDoCartao(faturaCartao: number): Observable<string> {
    const params = new HttpParams().set(
      'faturaCartao',
      faturaCartao.toString()
    );

    return this.sendHttpRequest(
      'GET',
      `${this.url}/despesa/calcular-fatura`,
      null,
      params
    ).pipe(map((response: any) => response.dados));
  }

  public enviarMensagemWhatsApp(
    nome: string,
    pix: string,
    isMoradia: boolean,
    titleMessage: string
  ): Observable<string> {
    const params = new HttpParams()
      .set('nome', nome)
      .set('pix', pix)
      .set('isMoradia', isMoradia.toString())
      .set('titleMessage', titleMessage);

    return this.sendHttpRequest(
      'GET',
      `${this.url}/membro/enviar-mensagem`,
      null,
      params
    ).pipe(map((response: any) => response.dados.redirectToWhatsApp));
  }
}
