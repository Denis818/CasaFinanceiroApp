import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { TemaCorNotification } from 'src/app/core/portal/services/tema-cor-notification.service';
import { BaseService } from 'src/app/core/services/base/base.service';
import { GraphicConfiguration } from 'src/app/shared/components/graphic/interfaces/graphic-configuration.interface';
import { ApiResponse } from 'src/app/shared/interfaces/api/api-response';
import { environment } from 'src/environments/environment';
import { ResumoGrupoResponse } from '../../interfaces/resumo-grupo-response.interface';
import { TotalPorGrupoResponse } from '../../interfaces/total-por-grupo-response.interface';

@Injectable({ providedIn: 'root' })
export class DashboardService extends BaseService {
  url: string = `${environment.base_url_financy}/despesa`;
  private graficoCor: string = '#6b18ffd4';

  constructor(private temaCorNotification: TemaCorNotification) {
    super();
    this.subscribeToThemeChanges();
  }

  public getDespesasDivididasPorMembro(): Observable<ResumoGrupoResponse> {
    return this.sendHttpRequest<ApiResponse<ResumoGrupoResponse>>({
      metodo: 'GET',
      url: this.url + '/despesas-dividas-por-membro',
    }).pipe(map((response) => response.dados));
  }

  public exportarRelatorioDespesasHabitacional() {
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

  public exportarRelatorioDespesasCasa() {
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
    const graficoCor = this.graficoCor;

    const ano =
      this.storageService.getItem('ano') || new Date().getFullYear().toString();

    const params = new HttpParams().set('ano', ano);
    return this.sendHttpRequest<ApiResponse<TotalPorGrupoResponse[]>>({
      metodo: 'GET',
      url: `${this.url}/total-por-grupo`,
      params: params,
    }).pipe(
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
                        fillStyle: graficoCor,
                        strokeStyle: graficoCor,
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
      return this.graficoCor;
    }
  }

  private subscribeToThemeChanges(): void {
    this.temaCorNotification.recarregarComponentComNovoTema.subscribe({
      next: () => {
        const theme =
          this.storageService.getItem('selectedTheme') || 'roxo-theme';
        this.updateThemeColor(theme);
      },
    });
  }

  private updateThemeColor(theme: string): void {
    switch (theme) {
      case 'azul-theme':
        this.graficoCor = '#1398e5';
        break;
      case 'dark-theme':
        this.graficoCor = '#375a7f';
        break;
      default:
        this.graficoCor = '#6b18ffd4';
    }
  }
}
