import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { Component, LOCALE_ID, OnInit } from '@angular/core';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { GraphicComponent } from 'src/app/shared/components/graphic/graphic-component/graphic.component';
import { GraphicConfiguration } from 'src/app/shared/components/graphic/interfaces/graphic-configuration.interface';
import { MatPaginatorIntlPt } from '../../../../shared/utilities/paginator/mat-paginator-intl-pt';
import { RelatorioGastosDoMesResponse } from '../../interfaces/financy/relatorio-gastos-mes-response.interface';
import { TotalPorCategoriaResponse } from '../../interfaces/financy/total-por-categoria-response.interface';
import { TotalPorMembroResponse } from '../../interfaces/financy/total-por-membro-response.interface';
import { TotalPorMesResponse } from '../../interfaces/financy/total-por-mes-response.interface';
import { FinancyService } from '../../services/financy/financy.service';

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
  imports: [CommonModule, MatPaginatorModule, GraphicComponent],
})
export class FinancyPage implements OnInit {
  despesasPorMembros: TotalPorMembroResponse[] = [];
  listDespesasPorCategoria: TotalPorCategoriaResponse[] = [];
  relatorioGastosDoMes: RelatorioGastosDoMesResponse = {
    mesAtual: '',
    totalAluguelCondominio: 0,
    totalGastosGerais: 0,
    totalGeral: 0,
  };

  graphicConfig: GraphicConfiguration = {
    chartData: { datasets: [], labels: [] },
    graphicStyle: {
      graphicType: 'line',
      width: 700,
      height: 404,
    },
    chartOptions: {
      responsive: false,
      plugins: {
        legend: {
          display: true,
          position: 'top',
        },
      },
    },
  };

  constructor(private readonly financyService: FinancyService) {}

  ngOnInit() {
    this.adjustGraphicForMobile();
    this.getResumoDespesasMensal();
    this.getTotalPorCategoria();
    this.getTotaisComprasPorMes();
  }

  adjustGraphicForMobile() {
    if (window.innerWidth < 768) {
      this.graphicConfig.graphicStyle.graphicType = 'bar';
      this.graphicConfig.graphicStyle.width = 330;
      this.graphicConfig.graphicStyle.height = 290;
    }
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
        this.graphicConfig.chartData.labels = dados.map((item) => item.mes);
        this.graphicConfig.chartData.datasets = [
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
