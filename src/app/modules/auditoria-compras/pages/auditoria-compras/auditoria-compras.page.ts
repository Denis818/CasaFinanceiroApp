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
import { grupoFaturaNotification } from 'src/app/core/home/services/grupo-fatura-notification.service';
import { Categoria } from 'src/app/modules/control-panel/interfaces/categoria.interface';
import { Despesa } from 'src/app/modules/control-panel/interfaces/despesa.interface';
import { ListFiltroDespesa } from 'src/app/shared/utilities/FiltroDespesa/list-filtro-despesa';
import { CustomPaginator } from 'src/app/shared/utilities/paginator/custom-paginator';
import { Pagination } from 'src/app/shared/utilities/paginator/pagination';

import { MatTooltipModule } from '@angular/material/tooltip';
import { CategoriaService } from 'src/app/modules/control-panel/services/categoria.service';
import { DespesaService } from 'src/app/modules/control-panel/services/despesa.service';
import { GraficoSugestoesEconomiaComponent } from '../../components/grafico-sugestoes-economia/grafico-sugestoes-economia.component';
import { SugestaoFornecedorComponent } from '../../components/sugestao-fornecedor/sugestao-fornecedor.component';
import { EnumFiltroDespesa } from 'src/app/shared/enums/enum-filtro-despesa';

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
    MatTooltipModule,
    SugestaoFornecedorComponent,
    GraficoSugestoesEconomiaComponent,
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: CustomPaginator },
    { provide: LOCALE_ID, useValue: 'pt-BR' },
  ],
})
export class ConferenciaComprasPage implements OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  private tempoParaAplicarFiltroPorItem = new Subject<string>();

  categorias: Categoria[] = [];

  despesasFiltradas: Despesa[] = [];
  filtro: string = '';

  tipoFiltro: EnumFiltroDespesa = EnumFiltroDespesa.Item;
  listTipoFiltro = this.listFiltroDespesa.listTipoFiltroConferenciaCompras;

  tamanhosDePagina: number[] = [5, 10, 50, 100];
  page: Pagination = {
    totalItens: 0,
    paginaAtual: 1,
    itensPorPagina: this.tamanhosDePagina[1],
  };

  constructor(
    private readonly despesaService: DespesaService,
    private readonly grupoFaturaNotification: grupoFaturaNotification,
    private readonly categoriaService: CategoriaService,
    private readonly listFiltroDespesa: ListFiltroDespesa
  ) {
    this.getListDespesasAllGrupos();
    this.tempoParaFiltrar();

    this.grupoFaturaNotification.anoSelecionado$.subscribe({
      next: (ano) => {
        this.getListDespesasAllGrupos();
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
        this.despesasFiltradas = listPaginada.itens;
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

  removerPrefixoFatura(nome: string): string {
    const prefixo = 'Fatura de ';
    if (nome.startsWith(prefixo)) {
      return nome.slice(prefixo.length);
    }
    return nome;
  }
}