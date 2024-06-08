import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { ApiResponse } from 'src/app/shared/interfaces/api/api-response';
import { GrupoFatura } from '../interfaces/grupo-fatura.interface';
import { StatusFaturaResponse } from '../interfaces/status-fatura-response.interface';
import {
  EnumFaturaType,
  EnumStatusFatura,
} from './../../shared/enums/enum-filtro-despesa';
import { CrudService } from './base/crud.service';

@Injectable({ providedIn: 'root' })
export abstract class GrupoFaturaService extends CrudService<GrupoFatura> {
  constructor() {
    super(`${environment.base_url_financy}/grupo-fatura`);
  }

  public getStatusFaturaByName(
    status: EnumStatusFatura
  ): Observable<StatusFaturaResponse> {
    const params = new HttpParams().set('status', status.toString());

    return this.sendHttpRequest<ApiResponse<StatusFaturaResponse>>(
      'GET',
      `${this.url}/status-fatura`,
      null,
      params
    ).pipe(map((response) => response.dados));
  }

  public updateStatusFatura(
    faturaNome: EnumFaturaType,
    status: EnumStatusFatura
  ): Observable<StatusFaturaResponse> {
    const params = new HttpParams()
      .set('status', status.toString())
      .set('faturaNome', faturaNome);

    return this.sendHttpRequest<ApiResponse<StatusFaturaResponse>>(
      'PUT',
      `${this.url}/status-fatura`,
      null,
      params
    ).pipe(map((response) => response.dados));
  }
}
