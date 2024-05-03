import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { BaseService } from 'src/app/core/services/base/base.service';
import { environment } from 'src/app/environments/environment';
import { GraphicConfiguration } from 'src/app/shared/components/graphic/interfaces/graphic-configuration.interface';
import { ApiResponse } from 'src/app/shared/interfaces/api/api-response';
import { ResumoMensalResponse } from '../../interfaces/financy/resumo-mensal-response.interface';
import { TotalPorCategoriaResponse } from '../../interfaces/financy/total-por-categoria-response.interface';
import { TotalPorMesResponse } from '../../interfaces/financy/total-por-mes-response.interface';

@Injectable({ providedIn: 'root' })
export class DashboardService extends BaseService {
  public readonly router = inject(Router);

  public url: string = `${environment.base_url_financy}/despesa`;

  public getResumoDespesasMensal(): Observable<ResumoMensalResponse> {
    return this.sendHttpRequest<ApiResponse<ResumoMensalResponse>>(
      'GET',
      this.url + '/resumo-despesas-mensal'
    ).pipe(map((response) => response.dados));
  }

  public getTotalPorCategoria(): Observable<TotalPorCategoriaResponse[]> {
    return this.sendHttpRequest<ApiResponse<TotalPorCategoriaResponse[]>>(
      'GET',
      `${this.url}/total-por-categoria`
    ).pipe(map((response) => response.dados));
  }

  public getTotaisComprasPorMes(): Observable<any[]> {
    return this.sendHttpRequest('GET', `${this.url}/total-por-mes`).pipe(
      map((response: any) => response.dados)
    );
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

  getGrraficoTotaisComprasPorMes(): Observable<GraphicConfiguration> {
    return this.sendHttpRequest<ApiResponse<TotalPorMesResponse[]>>(
      'GET',
      `${this.url}/total-por-mes`
    ).pipe(
      map(
        (response): GraphicConfiguration => ({
          chartData: {
            labels: response.dados.map((item) => item.mes),
            datasets: [
              {
                data: response.dados.map((item) => item.totalDespesas),
                borderColor: '#673ab7',
                backgroundColor: '#6b18ffd4',
                label: 'Total',
                fill: false,
              },
            ],
          },
          graphicStyle: {
            graphicType: 'line',
            width: 700,
            height: 404,
          },
          chartOptions: {
            responsive: true,
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
