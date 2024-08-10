import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { Component, LOCALE_ID, OnDestroy } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ChartOptions } from 'chart.js';
import { Subscription } from 'rxjs';
import { GrupoFaturaNotification } from 'src/app/core/portal/services/grupo-fatura-notification.service';
import { GraphicComponent } from 'src/app/shared/components/graphic/graphic-component/graphic.component';
import { GraphicConfiguration } from 'src/app/shared/components/graphic/interfaces/graphic-configuration.interface';
import { AuditoriaComprasService } from 'src/app/standalone/auditoria-compras/services/auditoria-compras.service';

registerLocaleData(localePt);
@Component({
  selector: 'grafico-sugestoes-economia',
  templateUrl: './grafico-sugestoes-economia.component.html',
  styleUrls: ['./grafico-sugestoes-economia.component.scss'],
  standalone: true,
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
  imports: [CommonModule, MatIconModule, MatTooltipModule, GraphicComponent],
})
export class GraficoSugestoesEconomiaComponent implements OnDestroy {
  private reloadPageSubscriber: Subscription;

  fornecedores: string[] = [];
  graphicConfig: GraphicConfiguration;

  constructor(
    private readonly comprasService: AuditoriaComprasService,
    private readonly grupoFaturaNotification: GrupoFaturaNotification
  ) {
    this.reloadDespesas();
  }

  ngOnDestroy() {
    if (this.reloadPageSubscriber) {
      this.reloadPageSubscriber.unsubscribe();
    }
  }

  reloadDespesas() {
    this.reloadPageSubscriber =
      this.grupoFaturaNotification.recarregarPaginaComNovoGrupoId.subscribe({
        next: (isReload) => {
          if (isReload) {
            this.getGraficoSugestoesEconomia();
          }
        },
      });
  }

  getGraficoSugestoesEconomia() {
    this.comprasService.getGraficoSugestoesEconomia().subscribe({
      next: (sugestaoEconomia) => {
        this.fornecedores = sugestaoEconomia.map(
          (item) => item.fornecedorMaisBarato
        );

        this.graphicConfig = {
          chartData: {
            labels: sugestaoEconomia.map((item) => item.item),
            datasets: [
              {
                data: sugestaoEconomia.map((item) => item.precoMaisBarato),
                borderColor: '#673ab7',
                backgroundColor: '#ea5f00e0',
                label: 'Preço Mais Barato',
                fill: false,
              },
              {
                data: sugestaoEconomia.map((item) => item.potencialEconomia),
                borderColor: '#0fe400',
                backgroundColor: '#0fe400',
                label: 'Economia',
                fill: false,
              },
            ],
          },
          chartOptions: this.getChartOptions(),
        };
      },
    });
  }

  getChartOptions(): ChartOptions {
    return {
      responsive: false,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'top',
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              const label = context.dataset.label || '';
              const value = context.raw;
              const formattedValue = this.formatCurrency(value);
              const fornecedor = this.fornecedores[context.dataIndex];
              return `${label}: ${formattedValue} - Fornecedor: ${fornecedor}`;
            },
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };
  }

  formatCurrency(value: unknown): string {
    if (typeof value === 'number' && !isNaN(value)) {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(value);
    }
    return 'R$0,00';
  }
}
