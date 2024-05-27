import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BaseService } from 'src/app/core/services/base/base.service';
import { environment } from 'src/app/environments/environment';
import { ApiResponse } from 'src/app/shared/interfaces/api/api-response';
import { SugestaoEconomiaResponse } from '../interfaces/sugestao-economia-response.interface';
import { SugestaoDeFornecedorResponse } from '../interfaces/sugestao-fornecedor-response';

@Injectable({ providedIn: 'root' })
export class ConferenciaComprasService extends BaseService {
  public url: string = `${environment.base_url_financy}`;

  public mediaDespesasPorFornecedor(
    paginaAtual: number,
    itensPorPagina: number
  ): Observable<SugestaoDeFornecedorResponse[]> {
    const params = new HttpParams()
      .set('paginaAtual', paginaAtual.toString())
      .set('itensPorPagina', itensPorPagina.toString());

    return this.sendHttpRequest<ApiResponse<SugestaoDeFornecedorResponse[]>>(
      'GET',
      `${this.url}/despesa/sugestoes-fornecedor`,
      null,
      params
    ).pipe(map((response) => response.dados));
  }

  getGraficoSugestoesEconomia(): Observable<SugestaoEconomiaResponse[]> {
    return this.sendHttpRequest<ApiResponse<SugestaoEconomiaResponse[]>>(
      'GET',
      `${this.url}/despesa/sugestoes-economia`
    ).pipe(map((response) => response.dados));
  }
}
