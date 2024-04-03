import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { Component, LOCALE_ID, OnInit } from '@angular/core';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { Pagination } from 'src/app/shared/utilities/paginator/pagination';
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
  imports: [CommonModule, MatPaginatorModule],
})
export class FinancyPage implements OnInit {
  despesasPorMembros: TotalPorMembroResponse[] = [];
  despesasPorCategoria: TotalPorCategoriaResponse[] = [];
  listComprasPorMes: TotalPorMesResponse[] = [];

  page: Pagination = {
    totalItens: 0,
    paginaAtual: 1,
    itensPorPagina: 4,
  };

  constructor(private readonly financyService: FinancyService) {}

  ngOnInit() {
    this.getTotalParaCadaMembro();
    this.getTotalPorCategoria();
    this.getTotaisComprasPorMes(
      this.page.paginaAtual,
      this.page.itensPorPagina
    );
  }

  getTotalParaCadaMembro() {
    this.financyService.getTotalParaCadaMembro().subscribe((dados) => {
      this.despesasPorMembros = dados.despesasPorMembros;
    });
  }

  getTotalPorCategoria() {
    this.financyService.getTotalPorCategoria().subscribe((dados) => {
      this.despesasPorCategoria = dados;
    });
  }

  getTotaisComprasPorMes(pagina: number, itensPorPagina: number) {
    this.financyService
      .getTotaisComprasPorMes(pagina, itensPorPagina)
      .subscribe((dados: any) => {
        this.listComprasPorMes = dados.itens;
        this.page.totalItens = dados.totalItens;
        this.page.paginaAtual = dados.paginaAtual;
      });
  }

  mudarPagina(event: any) {
    this.page.paginaAtual = event.pageIndex + 1;
    this.page.itensPorPagina = event.pageSize;
    this.getTotaisComprasPorMes(
      this.page.paginaAtual,
      this.page.itensPorPagina
    );
  }
}
