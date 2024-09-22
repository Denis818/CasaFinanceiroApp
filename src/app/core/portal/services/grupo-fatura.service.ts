import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { EnumTipoSpinner } from 'src/app/shared/enums/enum-tipo-spinner';
import { ApiResponse } from 'src/app/shared/interfaces/api/api-response';
import { environment } from 'src/environments/environment';
import { CrudService } from '../../services/base/crud.service';
import { EnumFaturaType } from '../enums/enum-fatura-type';
import { EnumStatusFatura } from '../enums/enum-status-fatura';
import { GrupoFaturaSeletorResponse } from '../interfaces/grupo-fatura-seletor-response.interface';
import { GrupoFatura } from '../interfaces/grupo-fatura.interface';
import { StatusFaturaResponse } from '../interfaces/status-fatura-response.interface';

@Injectable({ providedIn: 'root' })
export abstract class GrupoFaturaService extends CrudService<GrupoFatura> {
  constructor() {
    super(`${environment.base_url_financy}/grupo-fatura`);
  }

  public getListGrupoFaturaParaSeletor(
    ano: string = ''
  ): Observable<GrupoFaturaSeletorResponse[]> {
    if (!ano) {
      ano =
        this.storageService.getItem('ano') ||
        new Date().getFullYear().toString();
    }

    const params = new HttpParams().set('ano', ano);
    return this.sendHttpRequest<ApiResponse<GrupoFaturaSeletorResponse[]>>({
      metodo: 'GET',
      url: `${this.url}/seletor-grupo-fatura`,
      params: params,
    }).pipe(map((response) => response.dados));
  }

  public getListGruposFaturas(ano: string = ''): Observable<GrupoFatura[]> {
    if (!ano) {
      ano =
        this.storageService.getItem('ano') ||
        new Date().getFullYear().toString();
    }

    const params = new HttpParams().set('ano', ano);
    return this.sendHttpRequest<ApiResponse<GrupoFatura[]>>({
      metodo: 'GET',
      url: `${this.url}`,
      params: params,
    }).pipe(map((response) => response.dados));
  }

  public getStatusFaturaByName(
    status: EnumStatusFatura
  ): Observable<StatusFaturaResponse> {
    const params = new HttpParams().set('status', status.toString());

    return this.sendHttpRequest<ApiResponse<StatusFaturaResponse>>({
      metodo: 'GET',
      url: `${this.url}/status-fatura`,
      params: params,
    }).pipe(map((response) => response.dados));
  }

  public updateStatusFatura(
    faturaNome: EnumFaturaType,
    status: EnumStatusFatura
  ): Observable<StatusFaturaResponse> {
    const params = new HttpParams()
      .set('status', status.toString())
      .set('faturaNome', faturaNome);

    return this.sendHttpRequest<ApiResponse<StatusFaturaResponse>>({
      metodo: 'PUT',
      url: `${this.url}/status-fatura`,
      params: params,
      spinnerType: EnumTipoSpinner.saving,
    }).pipe(map((response) => response.dados));
  }
}
