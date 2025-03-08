import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { Component, LOCALE_ID, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Subscription } from 'rxjs';
import { TemaCorNotification } from 'src/app/core/portal/services/tema-cor-notification.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { GraphicComponent } from 'src/app/shared/components/graphic/graphic-component/graphic.component';
import { GraphicConfiguration } from 'src/app/shared/components/graphic/interfaces/graphic-configuration.interface';
import { TotalPorGrupoResponse } from '../../interfaces/total-por-grupo-response.interface';

registerLocaleData(localePt);

@Component({
  selector: 'app-grafico-total-grupo-fatura',
  templateUrl: './grafico-total-grupo-fatura.component.html',
  styleUrls: ['./grafico-total-grupo-fatura.component.scss'],
  standalone: true,
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
  imports: [
    CommonModule,
    GraphicComponent,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatRadioModule,
    FormsModule,
  ],
})
export class GraficoTotalGrupoFaturaComponent implements OnInit, OnDestroy {
  graphicConfig: GraphicConfiguration;
  private temaCorNotificationSubscriber: Subscription;

  private lastDados: TotalPorGrupoResponse[] = [];

  constructor(
    private temaCorNotification: TemaCorNotification,
    private readonly storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.subscribeToThemeChanges();
  }

  ngOnDestroy() {
    this.temaCorNotificationSubscriber?.unsubscribe();
  }

  public atualizarGrafico(dados: TotalPorGrupoResponse[]) {
    this.lastDados = dados;
    const graficoCor = this.updateThemeColor();
    this.graphicConfig = {
      chartData: {
        labels: dados.map((item) => item.grupoNome),
        datasets: [
          {
            data: dados.map((item) => item.total),
            backgroundColor: dados.map((item) =>
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
    };
  }

  private subscribeToThemeChanges() {
    this.temaCorNotificationSubscriber =
      this.temaCorNotification.recarregarComponentComNovoTema.subscribe({
        next: (isReload) => {
          if (isReload) {
            if (this.lastDados?.length) {
              this.atualizarGrafico(this.lastDados);
            }
          }
        },
      });
  }

  private getBackgroundColor(total: number): string {
    const limite = 5700;

    if (total > limite) {
      return '#ed2336';
    } else if (total >= limite * 0.9) {
      return '#e5bd00db';
    } else {
      return '#6b18ffd4';
    }
  }

  private updateThemeColor(): string {
    const theme = this.storageService.getItem('selectedTheme') || 'roxo-theme';

    switch (theme) {
      case 'azul-theme':
        return '#1398e5';
      case 'dark-theme':
        return '#375a7f';
      default:
        return '#6b18ffd4';
    }
  }
}
