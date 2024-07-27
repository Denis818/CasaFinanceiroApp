import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import {
  EnumFaturaType,
  EnumStatusFatura,
} from 'src/app/shared/enums/enum-filtro-despesa';
import { ApiResponse } from 'src/app/shared/interfaces/api/api-response';
import { environment } from 'src/environments/environment';
import { CrudService } from '../../services/base/crud.service';
import { GrupoFaturaSeletor } from '../interfaces/grupo-fatura-seletor-interface';
import { GrupoFatura } from '../interfaces/grupo-fatura.interface';
import { StatusFaturaResponse } from '../interfaces/status-fatura-response.interface';

@Injectable({ providedIn: 'root' })
export abstract class GrupoFaturaService extends CrudService<GrupoFatura> {
  constructor() {
    super(`${environment.base_url_financy}/grupo-fatura`);
  }

  public getListGrupoFaturaParaSeletorAsync(
    ano: string = ''
  ): Observable<GrupoFaturaSeletor[]> {
    if (!ano) {
      ano =
        this.storageService.getItem('ano') ||
        new Date().getFullYear().toString();
    }

    const params = new HttpParams().set('ano', ano);
    return this.sendHttpRequest<ApiResponse<GrupoFaturaSeletor[]>>(
      'GET',
      `${this.url}/seletor-grupo-fatura`,
      null,
      params
    ).pipe(map((response) => response.dados));
  }

  public getListGruposFaturas(ano: string = ''): Observable<GrupoFatura[]> {
    if (!ano) {
      ano =
        this.storageService.getItem('ano') ||
        new Date().getFullYear().toString();
    }

    const params = new HttpParams().set('ano', ano);
    return this.sendHttpRequest<ApiResponse<GrupoFatura[]>>(
      'GET',
      `${this.url}`,
      null,
      params
    ).pipe(map((response) => response.dados));
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
