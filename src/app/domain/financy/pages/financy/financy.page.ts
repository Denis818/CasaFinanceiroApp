import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { Component, LOCALE_ID, OnInit } from '@angular/core';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { GraphicComponent } from 'src/app/shared/utilities/components/graphic/graphic.component';
import { CustomDataset } from '../../../../shared/utilities/components/graphic/graphic.component';
import { MatPaginatorIntlPt } from '../../../../shared/utilities/paginator/mat-paginator-intl-pt';
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
  graphicComprasPorMes: CustomDataset;

  constructor(private readonly financyService: FinancyService) {}

  ngOnInit() {
    this.getTotalPorCategoria();
    this.getTotalParaCadaMembro();
    this.getTotaisComprasPorMes();
  }

  getTotalParaCadaMembro() {
    this.financyService.getTotalParaCadaMembro().subscribe((dados) => {
      this.despesasPorMembros = dados.despesasPorMembros;
    });
  }

  getTotaisComprasPorMes() {
    this.financyService
      .getTotaisComprasPorMes()
      .subscribe((dados: TotalPorMesResponse[]) => {
        this.graphicComprasPorMes = new CustomDataset();
        this.graphicComprasPorMes.labels = dados.map((item) => item.mes);
        this.graphicComprasPorMes.datasets.push({
          data: dados.map((item) => item.totalDespesas),
          label: 'Total',
          borderColor: '#673ab7',
          backgroundColor: '#6b18ffd4',
        });
      });
  }

  getTotalPorCategoria() {
    this.financyService
      .getTotalPorCategoria()
      .subscribe((dados: TotalPorCategoriaResponse[]) => {
        this.listDespesasPorCategoria = dados;
      });
  }
}
