import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BaseService } from 'src/app/core/services/base/base.service';
import { environment } from 'src/app/environments/environment';
import { GraphicConfiguration } from 'src/app/shared/components/graphic/interfaces/graphic-configuration.interface';
import { ApiResponse } from 'src/app/shared/interfaces/api/api-response';
import { ResumoGrupoResponse } from '../../interfaces/financy/resumo-grupo-response.interface';
import { TotalPorCategoriaResponse } from '../../interfaces/financy/total-por-categoria-response.interface';
import { TotalPorGrupoResponse } from '../../interfaces/financy/total-por-grupo-response.interface';

@Injectable({ providedIn: 'root' })
export class DashboardService extends BaseService {
  url: string = `${environment.base_url_financy}/despesa`;

  public getAnaliseDesesasPorGrupo(): Observable<ResumoGrupoResponse> {
    return this.sendHttpRequest<ApiResponse<ResumoGrupoResponse>>(
      'GET',
      this.url + '/analise-despesa-por-grupo'
    ).pipe(map((response) => response.dados));
  }

  public getTotalPorCategoria(): Observable<TotalPorCategoriaResponse[]> {
    return this.sendHttpRequest<ApiResponse<TotalPorCategoriaResponse[]>>(
      'GET',
      `${this.url}/total-por-categoria`
    ).pipe(map((response) => response.dados));
  }

  public downloadRelatorioDespesasHabitacional() {
    this.sendHttpRequestForDownload(
      this.url + '/pdf-despesas-moradia'
    ).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'relatorio-despesas-habitacional.pdf';
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      },
    });
  }

  public downloadRelatorioDespesasCasa() {
    this.sendHttpRequestForDownload(this.url + '/pdf-despesas-casa').subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'relatorio-despesas-casa.pdf';
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      },
    });
  }

  getGraficoTotaisComprasPorGrupo(): Observable<GraphicConfiguration> {
    const ano =
      this.storageService.getItem('ano') || new Date().getFullYear().toString();

    const params = new HttpParams().set('ano', ano);

    return this.sendHttpRequest<ApiResponse<TotalPorGrupoResponse[]>>(
      'GET',
      `${this.url}/total-por-grupo`,
      null,
      params
    ).pipe(
      map(
        (response): GraphicConfiguration => ({
          chartData: {
            labels: response.dados.map((item) => item.grupoNome),
            datasets: [
              {
                data: response.dados.map((item) => item.total),
                borderColor: '#673ab7',
                backgroundColor: '#6b18ffd4',
                label: 'Total',
                fill: false,
              },
            ],
          },
          chartOptions: {
            responsive: false,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: true,
                position: 'top',
              },
            },
          },
        })
      )
    );
  }
}
