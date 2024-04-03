import { HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { BaseService } from 'src/app/core/services/base/base.service';
import { environment } from 'src/app/environments/enviroment';
import { ApiResponse } from 'src/app/shared/interfaces/api/api-response';
import { RelatorioDespesasMensais } from '../../interfaces/financy/relatorio-despesas-mensais-response.interface';

@Injectable({ providedIn: 'root' })
export class FinancyService extends BaseService {
  public readonly router = inject(Router);

  public url: string = `${environment.base_url_financy}/api/Despesa`;

  public getTotalParaCadaMembro(): Observable<RelatorioDespesasMensais> {
    return this.sendHttpRequest<ApiResponse<RelatorioDespesasMensais>>(
      'GET',
      this.url + '/total-por-membro'
    ).pipe(map((response) => response.dados));
  }

  public getTotaisComprasPorMes(
    paginaAtual: number,
    itensPorPagina: number
  ): Observable<any[]> {
    const params = new HttpParams()
      .set('paginaAtual', paginaAtual.toString())
      .set('itensPorPagina', itensPorPagina.toString());

    return this.sendHttpRequest(
      'GET',
      `${this.url}/total-por-mes`,
      null,
      params
    ).pipe(map((response: any) => response.dados));
  }
}
