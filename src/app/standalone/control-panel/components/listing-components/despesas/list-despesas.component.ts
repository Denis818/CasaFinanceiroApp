import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import {
  Component,
  LOCALE_ID,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
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
import { MatTooltipModule } from '@angular/material/tooltip';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { ToastrService } from 'ngx-toastr';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { GrupoFatura } from 'src/app/core/portal/interfaces/grupo-fatura.interface';
import { GrupoFaturaNotification } from 'src/app/core/portal/services/grupo-fatura-notification.service';
import { GrupoFaturaService } from 'src/app/core/portal/services/grupo-fatura.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { ConfirmDeleteComponent } from 'src/app/shared/components/confirm-delete/confirm-delete.component';
import { EnumFiltroDespesa } from 'src/app/shared/enums/enum-filtro-despesa';
import { ListFiltroDespesa } from 'src/app/shared/utilities/FiltroDespesa/list-filtro-despesa';
import { CustomPaginator } from 'src/app/shared/utilities/paginator/custom-paginator';
import { Pagination } from 'src/app/shared/utilities/paginator/pagination';
import { Despesa } from 'src/app/standalone/control-panel/interfaces/despesa.interface';

import { MatButtonModule } from '@angular/material/button';
import { TableEditManipulation } from '../../../helpers/table-edit-manipulation';
import { Categoria } from '../../../interfaces/categoria.interface';
import { RelatorioGastosDoGrupoResponse } from '../../../interfaces/relatorio-gastos-grupo-response.interface';
import { CategoriaService } from '../../../services/categoria.service';
import { DespesaService } from '../../../services/despesa.service';
import { ChecarFaturaCartaoComponent } from '../../checar-fatura-cartao/checar-fatura-cartao.component';
import { CardDescricaoTotaisComponent } from './card-descricao-totais/card-descricao-totais.component';

registerLocaleData(localePt);

@Component({
  selector: 'list-despesas',
  templateUrl: './list-despesas.component.html',
  styleUrls: ['./list-despesas.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatPaginatorModule,
    FormsModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    CurrencyMaskModule,
    MatTooltipModule,
    MatButtonModule,
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: CustomPaginator },
    { provide: LOCALE_ID, useValue: 'pt-BR' },
  ],
})
export class ListDespesasComponent implements OnDestroy, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  private tempoParaAplicarFiltroPorItem = new Subject<string>();
  private reloadPageSubscriber: Subscription;

  categorias: Categoria[] = [];
  grupoFaturas: GrupoFatura[];

  isDespesaEditing: boolean = false;
  despesaAtual: Despesa;

  despesasFiltradas: Despesa[] = [];
  filtro: string = '';
  tipoFiltro: EnumFiltroDespesa = EnumFiltroDespesa.Item;
  listTipoFiltro = this.listFiltroDespesa.listTipoFiltroPainelControle;

  tamanhosDePagina: number[] = [5, 10, 50, 100];
  page: Pagination = {
    totalItens: 0,
    paginaAtual: 1,
    itensPorPagina: this.tamanhosDePagina[1],
  };

  relatorioGastosDoGrupo: RelatorioGastosDoGrupoResponse = {
    grupoFaturaNome: '',
    totalGastosMoradia: 0,
    totalGastosCasa: 0,
    totalGeral: 0,
  };

  constructor(
    private readonly despesaService: DespesaService,
    private readonly categoriaService: CategoriaService,
    private readonly grupoFaturaService: GrupoFaturaService,
    private readonly toastr: ToastrService,
    private readonly dialog: MatDialog,
    private readonly grupoFaturaNotification: GrupoFaturaNotification,
    protected readonly tableEditManipulation: TableEditManipulation,
    private readonly listFiltroDespesa: ListFiltroDespesa,
    private readonly storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.reloadDespesas();
    this.tempoParaFiltrar();
  }

  ngOnDestroy() {
    if (this.reloadPageSubscriber) {
      this.reloadPageSubscriber.unsubscribe();
    }
    this.tempoParaAplicarFiltroPorItem.unsubscribe();
  }
  reloadDespesas() {
    this.reloadPageSubscriber =
      this.grupoFaturaNotification.recarregarPaginaComNovoGrupoId.subscribe({
        next: (isReload) => {
          if (isReload) {
            this.getListDespesasPorGrupo();
          }
        },
      });
  }

  openLegendModal(): void {
    this.dialog.open(CardDescricaoTotaisComponent);
  }

  getStyle(valor: number, limite: number): { [key: string]: string } {
    if (valor > limite) {
      return { color: 'red' };
    } else if (valor >= limite * 0.9) {
      return { color: '#e5bd00' };
    } else {
      return {};
    }
  }

  openChecarFaturaCartaoModal(): void {
    this.dialog.open(ChecarFaturaCartaoComponent, {
      width: '450px',
    });
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
        this.getListDespesasPorGrupo();
      });
  }

  aoSelecionarFiltro() {
    if (this.filtro) {
      this.getListDespesasPorGrupo();
    }
  }

  aplicarFiltro(filtro: string): void {
    this.tempoParaAplicarFiltroPorItem.next(filtro);
  }

  //#endregion

  //#region Gets

  getListDespesasPorGrupo() {
    this.despesaService
      .getListDespesasPorGrupo(
        this.filtro,
        this.tipoFiltro,
        this.page.paginaAtual,
        this.page.itensPorPagina
      )
      .subscribe((listPaginada) => {
        this.despesasFiltradas = listPaginada.itens;
        this.page.totalItens = listPaginada.totalItens;
        this.page.paginaAtual = listPaginada.paginaAtual;

        this.getRelatorioDeGastosDoGrupo();
      });

    this.isDespesaEditing = false;
  }

  getAllCategorias() {
    this.categoriaService.getAll().subscribe({
      next: (categorias) => {
        this.categorias = categorias;
      },
    });
  }

  getAllGrupoFatura() {
    this.grupoFaturaService.getListGruposFaturas().subscribe({
      next: (grupoFaturas) => {
        this.grupoFaturas = grupoFaturas;
      },
    });
  }

  getRelatorioDeGastosDoGrupo() {
    this.despesaService
      .getRelatorioDeGastosDoGrupo()
      .subscribe((relatorioGastosDoGrupo) => {
        this.relatorioGastosDoGrupo = relatorioGastosDoGrupo;
      });
  }

  //#endregion

  //#region Update

  openEdit(despesa: Despesa): void {
    if (!this.isDespesaEditing) {
      this.isDespesaEditing = true;
      despesa.isDespesaEditing = !despesa.isDespesaEditing;

      this.despesaAtual = JSON.parse(JSON.stringify(despesa));

      this.getAllCategorias();
      this.getAllGrupoFatura();
    }
  }

  cancelEdit(despesa: Despesa) {
    Object.assign(despesa, this.despesaAtual);
    this.resetPropertys(despesa);
  }

  updateDespesa(id: number, despesa: Despesa): void {
    despesa.categoriaId = despesa.categoria.id;
    despesa.grupoFaturaId = despesa.grupoFatura.id;

    if (!this.despesaAlterada(despesa)) {
      this.despesaService.update(id, despesa).subscribe({
        next: (despesaAtualizada) => {
          if (despesaAtualizada) {
            this.toastr.success('Atualizado com sucesso!', 'Finalizado!');
          }
          this.getListDespesasPorGrupo();
        },
        error: () => this.getListDespesasPorGrupo(),
      });
    }

    this.resetPropertys(despesa);
  }

  //#endregion

  //#region Delete

  confirmDelete(idDespesa: number): void {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteDespesa(idDespesa);
      }
    });
  }

  deleteDespesa(despesaId: number): void {
    this.despesaService.delete(despesaId).subscribe({
      next: (hasDeleted) => {
        if (hasDeleted) {
          this.toastr.success('Deletado com sucesso!', 'Finalizado!');
        }
        this.getListDespesasPorGrupo();
      },
    });
  }

  //#endregion

  //#region Metodos de suporte

  mudarPagina(event: PageEvent): void {
    this.page.paginaAtual = event.pageIndex + 1;
    this.page.itensPorPagina = event.pageSize;
    this.getListDespesasPorGrupo();
  }

  despesaAlterada(despesa: Despesa): boolean {
    return (
      this.despesaAtual.item === despesa.item &&
      this.despesaAtual.preco === despesa.preco &&
      this.despesaAtual.quantidade === despesa.quantidade &&
      this.despesaAtual.fornecedor === despesa.fornecedor &&
      this.despesaAtual.categoria.id === despesa.categoriaId &&
      this.despesaAtual.grupoFatura.id === despesa.grupoFaturaId
    );
  }

  resetPropertys(despesa: Despesa) {
    despesa.isDespesaEditing = false;
    this.isDespesaEditing = false;
    this.despesaAtual = null;
  }
  //#endregion
}
