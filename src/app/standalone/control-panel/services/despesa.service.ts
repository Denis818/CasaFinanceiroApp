import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CrudService } from 'src/app/core/services/base/crud.service';
import { EnumFiltroDespesa } from 'src/app/shared/enums/enum-filtro-despesa';
import { ApiResponse } from 'src/app/shared/interfaces/api/api-response';
import { environment } from 'src/environments/environment';
import { PaginationResponse } from '../../../shared/utilities/paginator/pagination-response.interface';
import { Despesa } from '../interfaces/despesa.interface';
import { ParametroAlertaGastos } from '../interfaces/parametro-alerta-gastos.interface';
import { RelatorioGastosDoGrupoResponse } from '../interfaces/relatorio-gastos-grupo-response.interface';

@Injectable({ providedIn: 'root' })
export class DespesaService extends CrudService<Despesa> {
  private metricas: ParametroAlertaGastos[] = [];

  constructor() {
    super(`${environment.base_url_financy}/despesa`);
  }

  public getListDespesasAllGrupos(
    filterItem: string,
    paginaAtual: number,
    itensPorPagina: number,
    tipoFilter: EnumFiltroDespesa
  ): Observable<PaginationResponse<Despesa>> {
    const despesaFiltro = {
      filter: filterItem,
      tipoFiltro: tipoFilter,
      paginaAtual: paginaAtual,
      itensPorPagina: itensPorPagina,
      ano:
        this.storageService.getItem('ano') ||
        new Date().getFullYear().toString(),
    };

    const params = new HttpParams({ fromObject: { ...despesaFiltro } });

    return this.sendHttpRequest<ApiResponse<PaginationResponse<Despesa>>>({
      metodo: 'GET',
      url: `${this.url}/todos-grupos`,
      params: params,
    }).pipe(map((response) => response.dados));
  }

  public getRelatorioDeGastosDoGrupo(): Observable<RelatorioGastosDoGrupoResponse> {
    return this.sendHttpRequest<ApiResponse<RelatorioGastosDoGrupoResponse>>({
      metodo: 'GET',
      url: this.url + '/relatorio-gastos-grupo',
    }).pipe(map((response) => response.dados));
  }

  public getListDespesasPorGrupo(
    filterItem: string,
    tipoFilter: EnumFiltroDespesa,
    paginaAtual: number,
    itensPorPagina: number
  ): Observable<PaginationResponse<Despesa>> {
    const despesaFiltro = {
      filter: filterItem,
      tipoFiltro: tipoFilter,
      paginaAtual: paginaAtual,
      itensPorPagina: itensPorPagina,
    };

    const params = new HttpParams({ fromObject: { ...despesaFiltro } });

    return this.sendHttpRequest<ApiResponse<PaginationResponse<Despesa>>>({
      metodo: 'GET',
      url: `${this.url}/por-grupo`,
      params: params,
    }).pipe(map((response) => response.dados));
  }

  public conferirFaturaDoCartao(faturaCartao: number): Observable<string> {
    const params = new HttpParams().set(
      'faturaCartao',
      faturaCartao.toString()
    );

    return this.sendHttpRequest({
      metodo: 'GET',
      url: `${this.url}/calcular-fatura`,
      params: params,
    }).pipe(map((response: any) => response.dados));
  }

  public getParametrosDeAlertasDeGastos(): Observable<ParametroAlertaGastos[]> {
    return this.sendHttpRequest<ApiResponse<ParametroAlertaGastos[]>>({
      metodo: 'GET',
      url: this.url + '/parametro-alerta-gastos',
    }).pipe(map((response) => response.dados));
  }

  public updateParametroAlertaGastos(
    metricas: ParametroAlertaGastos[]
  ): Observable<boolean> {
    return this.sendHttpRequest<ApiResponse<boolean>>({
      metodo: 'PUT',
      url: `${this.url}/parametro-alerta-gastos`,
      dados: metricas,
    }).pipe(map((response) => response.dados));
  }

  public getNameFatura(code: string): Observable<string> {
    return this.sendHttpRequest<ApiResponse<string>>({
      metodo: 'GET',
      url: `${environment.base_url_financy}/grupo-fatura/${code}`,
    }).pipe(map((response) => response.dados));
  }
}
