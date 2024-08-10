import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BaseService } from 'src/app/core/services/base/base.service';
import { GraphicConfiguration } from 'src/app/shared/components/graphic/interfaces/graphic-configuration.interface';
import { ApiResponse } from 'src/app/shared/interfaces/api/api-response';
import { environment } from 'src/environments/environment';
import { ResumoGrupoResponse } from '../../interfaces/resumo-grupo-response.interface';
import { TotalPorCategoriaResponse } from '../../interfaces/total-por-categoria-response.interface';
import { TotalPorGrupoResponse } from '../../interfaces/total-por-grupo-response.interface';

@Injectable({ providedIn: 'root' })
export class DashboardService extends BaseService {
  url: string = `${environment.base_url_financy}/despesa`;

  public getDespesasDivididasPorMembro(): Observable<ResumoGrupoResponse> {
    return this.sendHttpRequest<ApiResponse<ResumoGrupoResponse>>(
      'GET',
      this.url + '/despesas-dividas-por-membro'
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
                backgroundColor: response.dados.map((item) =>
                  this.getBackgroundColor(item.total)
                ),
                borderColor: '#673ab7',
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
                labels: {
                  generateLabels: function (chart) {
                    return [
                      {
                        text: 'Fatura Muito Alta  ',
                        fillStyle: '#ff0000d9',
                        strokeStyle: 'red',
                        lineWidth: 1,
                        fontColor: '#708090',
                        font: {
                          weight: 'bold',
                        },
                      },
                      {
                        text: 'Fatura Razoável  ',
                        fillStyle: '#e5bd00db',
                        strokeStyle: '#e5bd00',
                        lineWidth: 1,
                        fontColor: '#708090',
                        font: {
                          weight: 'bold',
                        },
                      },
                      {
                        text: 'Fatura Neutra',
                        fillStyle: '#6b18ffd4',
                        strokeStyle: '#6b18ffd4',
                        lineWidth: 1,
                        fontColor: '#708090',
                        font: {
                          weight: 'bold',
                        },
                      },
                    ];
                  },
                },
              },
            },
          },
        })
      )
    );
  }

  private getBackgroundColor(total: number): string {
    const limite = 5700;
    if (total > limite) {
      return '#ff0000d9';
    } else if (total >= limite * 0.9) {
      return '#e5bd00db';
    } else {
      return '#6b18ffd4';
    }
  }
}
