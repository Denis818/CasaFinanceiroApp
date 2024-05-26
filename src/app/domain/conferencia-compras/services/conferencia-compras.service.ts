import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BaseService } from 'src/app/core/services/base/base.service';
import { environment } from 'src/app/environments/environment';
import { ApiResponse } from 'src/app/shared/interfaces/api/api-response';
import { MediaPorFornecedor } from '../interfaces/media-por-fornecedor.interface';
import { SugestaoEconomia } from '../interfaces/sugestao-economia.interface';

@Injectable({ providedIn: 'root' })
export class ConferenciaComprasService extends BaseService {
  public url: string = `${environment.base_url_financy}`;

  public mediaDespesasPorFornecedor(
    paginaAtual: number,
    itensPorPagina: number
  ): Observable<MediaPorFornecedor[]> {
    const params = new HttpParams()
      .set('paginaAtual', paginaAtual.toString())
      .set('itensPorPagina', itensPorPagina.toString());

    return this.sendHttpRequest<ApiResponse<MediaPorFornecedor[]>>(
      'GET',
      `${this.url}/despesa/media-por-fornecedor`,
      null,
      params
    ).pipe(map((response) => response.dados));
  }

  getGraficoSugestoesEconomia(): Observable<SugestaoEconomia[]> {
    return this.sendHttpRequest<ApiResponse<SugestaoEconomia[]>>(
      'GET',
      `${this.url}/despesa/sugestoes-economia`
    ).pipe(map((response) => response.dados));
  }
}
