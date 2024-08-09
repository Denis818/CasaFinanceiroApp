import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { Component, LOCALE_ID, OnDestroy, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {
  MatPaginator,
  MatPaginatorIntl,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { Subject, debounceTime } from 'rxjs';
import { GrupoFaturaNotification } from 'src/app/core/portal/services/grupo-fatura-notification.service';
import { ListFiltroDespesa } from 'src/app/shared/utilities/FiltroDespesa/list-filtro-despesa';
import { CustomPaginator } from 'src/app/shared/utilities/paginator/custom-paginator';
import { Pagination } from 'src/app/shared/utilities/paginator/pagination';
import { Categoria } from 'src/app/standalone/control-panel/interfaces/categoria.interface';
import { Despesa } from 'src/app/standalone/control-panel/interfaces/despesa.interface';

import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EnumFiltroDespesa } from 'src/app/shared/enums/enum-filtro-despesa';
import { ListgrupoFaturaComponent } from 'src/app/standalone/control-panel/components/listing-components/grupo-fatura/list-grupo-fatura.component';
import { CategoriaService } from 'src/app/standalone/control-panel/services/categoria.service';
import { DespesaService } from 'src/app/standalone/control-panel/services/despesa.service';
import { GraficoSugestoesEconomiaComponent } from '../../components/grafico-sugestoes-economia/grafico-sugestoes-economia.component';
import { SugestaoFornecedorComponent } from '../../components/sugestao-fornecedor/sugestao-fornecedor.component';

registerLocaleData(localePt);

@Component({
  selector: 'app-auditoria-compras',
  templateUrl: './auditoria-compras.page.html',
  styleUrls: ['./auditoria-compras.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatPaginatorModule,
    FormsModule,
    MatIconModule,
    MatTableModule,
    MatInputModule,
    MatSelectModule,
    MatSortModule,
    MatTooltipModule,
    SugestaoFornecedorComponent,
    GraficoSugestoesEconomiaComponent,
    ListgrupoFaturaComponent,
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: CustomPaginator },
    { provide: LOCALE_ID, useValue: 'pt-BR' },
  ],
})
export class ConferenciaComprasPage implements OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = [
    'Grupo de Fatura',
    'Item',
    'Categoria',
    'Fornecedor',
    'Preço',
    'Quantidade',
    'Total',
    'Data da compra',
  ];

  private tempoParaAplicarFiltroPorItem = new Subject<string>();

  categorias: Categoria[] = [];
  despesas: Despesa[] = [];
  sortedData: Despesa[];

  filtro: string = '';
  tipoFiltro: EnumFiltroDespesa = EnumFiltroDespesa.Item;
  listTipoFiltro = this.listFiltroDespesa.listTipoFiltroConferenciaCompras;

  tamanhosDePagina: number[] = [5, 10, 50, 100];
  page: Pagination = {
    totalItens: 0,
    paginaAtual: 1,
    itensPorPagina: this.tamanhosDePagina[0],
  };

  constructor(
    private readonly despesaService: DespesaService,
    private readonly grupoFaturaNotification: GrupoFaturaNotification,
    private readonly categoriaService: CategoriaService,
    private readonly listFiltroDespesa: ListFiltroDespesa
  ) {
    this.tempoParaFiltrar();

    this.grupoFaturaNotification.recarregarComponentComNovoAno.subscribe({
      next: (isReload) => {
        if (isReload) {
          this.getListDespesasAllGrupos();
        }
      },
    });
  }

  ngOnDestroy() {
    this.tempoParaAplicarFiltroPorItem.unsubscribe();
  }

  //#region Filtro
  tempoParaFiltrar() {
    this.tempoParaAplicarFiltroPorItem
      .pipe(debounceTime(700))
      .subscribe((filtro) => {
        this.filtro = filtro;

        this.page.paginaAtual = 1;
        if (this.paginator) {
          this.paginator.pageIndex = 0;
        }
        this.getListDespesasAllGrupos();
      });
  }

  aoSelecionarFiltro() {
    if (this.filtro) {
      this.getListDespesasAllGrupos();
    }
  }

  aplicarFiltro(filtro: string): void {
    this.tempoParaAplicarFiltroPorItem.next(filtro);
  }
  //#endregion

  //#region Gets
  getListDespesasAllGrupos() {
    this.despesaService
      .getListDespesasAllGrupos(
        this.filtro,
        this.page.paginaAtual,
        this.page.itensPorPagina,
        this.tipoFiltro
      )
      .subscribe((listPaginada) => {
        this.despesas = listPaginada.itens;
        this.sortedData = this.despesas.slice();
        this.page.totalItens = listPaginada.totalItens;
        this.page.paginaAtual = listPaginada.paginaAtual;
      });
  }

  getAllCategorias() {
    this.categoriaService.getAll().subscribe({
      next: (categorias) => {
        this.categorias = categorias;
      },
    });
  }

  mudarPagina(event: PageEvent): void {
    this.page.paginaAtual = event.pageIndex + 1;
    this.page.itensPorPagina = event.pageSize;
    this.getListDespesasAllGrupos();
  }
  //#endregion

  //#region Ordenador
  sortData(sort: Sort) {
    const data = this.despesas.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'Grupo de Fatura':
          return this.compare(a.grupoFatura.nome, b.grupoFatura.nome, isAsc);
        case 'Item':
          return this.compare(a.item, b.item, isAsc);
        case 'Categoria':
          return this.compare(
            a.categoria.descricao,
            b.categoria.descricao,
            isAsc
          );
        case 'Fornecedor':
          return this.compare(a.fornecedor, b.fornecedor, isAsc);
        case 'Preço':
          return this.compare(a.preco, b.preco, isAsc);
        case 'Quantidade':
          return this.compare(a.quantidade, b.quantidade, isAsc);
        case 'Total':
          return this.compare(a.total, b.total, isAsc);
        case 'Data da compra':
          return this.compare(a.dataCompra, b.dataCompra, isAsc);
        default:
          return 0;
      }
    });
  }

  compare(
    a: number | string | Date,
    b: number | string | Date,
    isAsc: boolean
  ) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
  //#endregion

  removerPrefixoFatura(nome: string): string {
    const prefixo = 'Fatura de ';
    if (nome.startsWith(prefixo)) {
      return nome.slice(prefixo.length);
    }
    return nome;
  }
}
