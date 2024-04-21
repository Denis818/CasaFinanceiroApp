import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { GraphicComponent } from 'src/app/shared/components/graphic/graphic-component/graphic.component';
import { GraphicConfiguration } from 'src/app/shared/components/graphic/interfaces/graphic-configuration.interface';
import { GraphicMobile } from 'src/app/shared/components/graphic/interfaces/graphic-mobile.interface';
import { DespesaPorMembroResponse } from '../../interfaces/financy/despesa-por-membro-response.interface';
import { RelatorioGastosDoMesResponse } from '../../interfaces/financy/relatorio-gastos-mes-response.interface';
import { TotalPorCategoriaResponse } from '../../interfaces/financy/total-por-categoria-response.interface';
import { DashboardService } from '../../services/dashboard/dashboard.service';

registerLocaleData(localePt);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
  imports: [CommonModule, GraphicComponent],
})
export class DashboardPage implements OnInit {
  despesasPorMembros: DespesaPorMembroResponse[] = [];
  listDespesasPorCategoria: TotalPorCategoriaResponse[] = [];

  relatorioGastosDoMes: RelatorioGastosDoMesResponse = {
    mesAtual: '',
    totalAluguelCondominio: 0,
    totalGastosGerais: 0,
    totalGeral: 0,
  };

  graphicConfig: GraphicConfiguration;
  graphicMobile: GraphicMobile = {
    graphicType: 'bar',
    width: 330,
    height: 290,
  };

  constructor(private readonly dashboardService: DashboardService) {}

  ngOnInit() {
    this.getGraficoTotaisComprasPorMes();
    this.getTotalPorCategoria();
    this.getResumoDespesasMensal();
  }

  getGraficoTotaisComprasPorMes() {
    this.dashboardService.getGrraficoTotaisComprasPorMes().subscribe({
      next: (graphicConfig) => {
        this.graphicConfig = graphicConfig;
      },
    });
  }

  getResumoDespesasMensal() {
    this.dashboardService.getResumoDespesasMensal().subscribe((dados) => {
      this.despesasPorMembros = dados.despesasPorMembros;
      this.relatorioGastosDoMes = dados.relatorioGastosDoMes;
    });
  }

  getTotalPorCategoria() {
    this.dashboardService.getTotalPorCategoria().subscribe((dados) => {
      this.listDespesasPorCategoria = dados;
    });
  }

  downloadRelatorioDespesasHabitacional() {
    this.dashboardService.downloadRelatorioDespesasHabitacional();
  }

  downloadRelatorioDespesasCasa() {
    this.dashboardService.downloadRelatorioDespesasCasa();
  }
}
