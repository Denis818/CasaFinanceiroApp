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
import { DespesaPorMembroResponse } from '../../interfaces/financy/despesa-por-membro-response.interface';
import { RelatorioGastosDoMesResponse } from '../../interfaces/financy/relatorio-gastos-mes-response.interface';
import { TotalPorCategoriaResponse } from '../../interfaces/financy/total-por-categoria-response.interface';
import { FinancyService } from '../../services/financy/financy.service';
import { GraphicMobile } from 'src/app/shared/components/graphic/interfaces/graphic-mobile.interface';

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

  constructor(private readonly financyService: FinancyService) {}

  ngOnInit() {
    this.getGraficoTotaisComprasPorMes();
    this.getTotalPorCategoria();
    this.getResumoDespesasMensal();
  }

  getGraficoTotaisComprasPorMes() {
    this.financyService.getGrraficoTotaisComprasPorMes().subscribe({
      next: (graphicConfig) => {
        this.graphicConfig = graphicConfig;
      },
    });
  }

  getResumoDespesasMensal() {
    this.financyService.getResumoDespesasMensal().subscribe((dados) => {
      this.despesasPorMembros = dados.despesasPorMembros;
      this.relatorioGastosDoMes = dados.relatorioGastosDoMes;
    });
  }

  getTotalPorCategoria() {
    this.financyService.getTotalPorCategoria().subscribe((dados) => {
      this.listDespesasPorCategoria = dados;
    });
  }
}
