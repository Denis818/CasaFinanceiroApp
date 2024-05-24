import { HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { BaseService } from 'src/app/core/services/base/base.service';
import { environment } from 'src/app/environments/environment';
import { EnumFiltroDespesa } from 'src/app/shared/enums/enumFiltroDespesa';
import { ApiResponse } from 'src/app/shared/interfaces/api/api-response';
import { PaginationResponse } from '../../../shared/utilities/paginator/pagination-response.interface';
import { Despesa } from '../../painel-controle/interfaces/despesa.interface';
import { SugestaoEconomiaDespesa } from '../interfaces/sugestao-economia-despesa';

@Injectable({ providedIn: 'root' })
export class ConferenciaComprasService extends BaseService {
  public readonly router = inject(Router);
  public url: string = `${environment.base_url_financy}`;

  public getListDespesasAllGrupos(
    filterItem: string,
    paginaAtual: number,
    itensPorPagina: number,
    tipoFilter: EnumFiltroDespesa
  ): Observable<PaginationResponse<Despesa>> {
    const params = new HttpParams()
      .set('paginaAtual', paginaAtual.toString())
      .set('itensPorPagina', itensPorPagina.toString())
      .set('filter', filterItem)
      .set('tipoFiltro', tipoFilter);

    console.log('disparando');
    return this.sendHttpRequest<ApiResponse<PaginationResponse<Despesa>>>(
      'GET',
      `${this.url}/despesa/todos-grupos`,
      null,
      params
    ).pipe(map((response) => response.dados));
  }

  public getSugestoesDeOtimizacaoDeDespesas(): Observable<
    SugestaoEconomiaDespesa[]
  > {
    return this.sendHttpRequest<ApiResponse<SugestaoEconomiaDespesa[]>>(
      'GET',
      `${this.url}/despesa/sugerir-otimizacao`
    ).pipe(map((response) => response.dados));
  }
}
