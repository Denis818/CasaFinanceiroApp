import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { Component, LOCALE_ID, OnInit } from '@angular/core';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { Chart, ChartConfiguration, ChartData, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { MatPaginatorIntlPt } from '../../../../shared/utilities/paginator/mat-paginator-intl-pt';
import { RelatorioGastosDoMesResponse } from '../../interfaces/financy/relatorio-gastos-mes-response.interface';
import { TotalPorCategoriaResponse } from '../../interfaces/financy/total-por-categoria-response.interface';
import { TotalPorMembroResponse } from '../../interfaces/financy/total-por-membro-response.interface';
import { TotalPorMesResponse } from '../../interfaces/financy/total-por-mes-response.interface';
import { FinancyService } from '../../services/financy/financy.service';

Chart.register(...registerables);

registerLocaleData(localePt);

@Component({
  selector: 'app-financy',
  templateUrl: './financy.page.html',
  styleUrls: ['./financy.page.scss'],
  standalone: true,
  providers: [
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntlPt },
    { provide: LOCALE_ID, useValue: 'pt-BR' },
  ],
  imports: [CommonModule, MatPaginatorModule, BaseChartDirective],
})
export class FinancyPage implements OnInit {
  despesasPorMembros: TotalPorMembroResponse[] = [];
  listDespesasPorCategoria: TotalPorCategoriaResponse[] = [];
  relatorioGastosDoMes: RelatorioGastosDoMesResponse;

  chartData: ChartData = {
    datasets: [],
    labels: [],
  };
 chartOptions: ChartConfiguration['options'] = {
  responsive: false,
  plugins: {
    legend: {
      display: true,
      position: 'bottom',
    },
  },
  indexAxis: 'y',
  scales: {
    x: {
      display: false,
    },
    y: {
      display: false, 
    }
  }
};


  constructor(private readonly financyService: FinancyService) {}

  ngOnInit() {
    this.getResumoDespesasMensal();
    this.getTotalPorCategoria();
    this.getTotaisComprasPorMes();
  }

  getResumoDespesasMensal() {
    this.financyService.getResumoDespesasMensal().subscribe((dados) => {
      this.despesasPorMembros = dados.despesasPorMembros;
      this.relatorioGastosDoMes = dados.relatorioGastosDoMes;
    });
  }

  getTotalPorCategoria() {
    this.financyService
      .getTotalPorCategoria()
      .subscribe((dados: TotalPorCategoriaResponse[]) => {
        this.listDespesasPorCategoria = dados;
      });
  }

  getTotaisComprasPorMes() {
    this.financyService
      .getTotaisComprasPorMes()
      .subscribe((dados: TotalPorMesResponse[]) => {
        this.chartData.labels = dados.map((item) => item.mes);
        this.chartData.datasets = [
          {
            data: dados.map((item) => item.totalDespesas),
            borderColor: '#673ab7',
            backgroundColor: '#6b18ffd4',
            label: 'Total',
            fill: false,
          },
        ];
      });
  }
}
