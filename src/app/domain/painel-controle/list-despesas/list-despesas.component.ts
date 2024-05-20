import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { Component, LOCALE_ID, OnDestroy, ViewChild } from '@angular/core';
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
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { ToastrService } from 'ngx-toastr';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { GrupoDespesa } from 'src/app/core/interfaces/grupo-despesa.interface';
import { HomeService } from 'src/app/core/services/home/home-service';
import { Despesa } from 'src/app/domain/painel-controle/interfaces/despesa.interface';
import { PainelControleService } from 'src/app/domain/painel-controle/services/painel-controle.service';
import { EnumFiltroDespesa } from 'src/app/shared/enums/enumFiltroDespesa';
import { CustomPaginator } from 'src/app/shared/utilities/paginator/custom-paginator';
import { Pagination } from 'src/app/shared/utilities/paginator/pagination';
import { TableEditManipulation } from '../helper/table-edit-manipulation';
import { Categoria } from '../interfaces/categoria.interface';
import { ConfirmDeleteModal } from '../modais/utilities/delete/confirm-delete.modal';

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
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: CustomPaginator },
    { provide: LOCALE_ID, useValue: 'pt-BR' },
  ],
})
export class ListDespesasComponent implements OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  private tempoParaAplicarFiltroPorItem = new Subject<string>();
  private reloadPageSubscriber: Subscription;

  categorias: Categoria[] = [];
  grupoDespesas: GrupoDespesa[];

  originalDespesa: Despesa;
  isDespesaEditing: boolean = false;

  despesasFiltradas: Despesa[];
  filtro: string = '';
  tipoFiltro: EnumFiltroDespesa = EnumFiltroDespesa.Item;
  tiposFiltro = [
    { value: EnumFiltroDespesa.Item, viewValue: 'Item' },
    { value: EnumFiltroDespesa.Categoria, viewValue: 'Categoria' },
    { value: EnumFiltroDespesa.Fornecedor, viewValue: 'Fornecedor' },
  ];

  tamanhosDePagina: number[] = [5, 10, 50, 100];
  page: Pagination = {
    totalItens: 0,
    paginaAtual: 1,
    itensPorPagina: this.tamanhosDePagina[1],
  };

  constructor(
    private painelService: PainelControleService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private homeService: HomeService,
    protected tableEditManipulation: TableEditManipulation
  ) {
    this.reloadDespesas();
    this.tempoParaFiltrar();
  }

  ngOnDestroy() {
    if (this.reloadPageSubscriber) {
      this.reloadPageSubscriber.unsubscribe();
    }

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
    this.painelService
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
      });

    this.isDespesaEditing = false;
  }

  getAllCategorias() {
    this.painelService.getAll<Categoria>('categoria').subscribe({
      next: (categorias) => {
        this.categorias = categorias;
      },
    });
  }

  reloadDespesas() {
    this.reloadPageSubscriber =
      this.homeService.reloadPageWithNewGrupoId.subscribe({
        next: (isReload) => {
          if (isReload) {
            this.getListDespesasPorGrupo();
          }
        },
      });
  }

  mudarPagina(event: PageEvent): void {
    this.page.paginaAtual = event.pageIndex + 1;
    this.page.itensPorPagina = event.pageSize;
    this.getListDespesasPorGrupo();
  }

  //#endregion

  //#region Update

  openEdit(despesa: Despesa): void {
    if (!this.isDespesaEditing) {
      this.isDespesaEditing = true;
      despesa.isDespesaEditing = !despesa.isDespesaEditing;
      this.originalDespesa = JSON.parse(JSON.stringify(despesa));

      this.getAllCategorias();
    }
  }

  cancelEdit(despesa: Despesa) {
    despesa.isDespesaEditing = false;
    this.isDespesaEditing = false;
  }

  updateDespesa(id: number, despesa: Despesa): void {
    despesa.categoriaId = despesa.categoria.id;
    despesa.grupoDespesaId = despesa.grupoDespesa.id;

    if (!this.teveAlteracoes(this.originalDespesa, despesa)) {
      this.painelService.update(id, despesa, 'despesa').subscribe({
        next: (despesaAtualizada) => {
          if (despesaAtualizada) {
            this.toastr.success('Atualizado com sucesso!', 'Finalizado!');
          }
          this.getListDespesasPorGrupo();
        },
        error: () => this.getListDespesasPorGrupo(),
      });
    }

    despesa.isDespesaEditing = false;
    this.isDespesaEditing = false;
  }
  //#endregion

  //#region Delete
  confirmDelete(idDespesa: number): void {
    const dialogRef = this.dialog.open(ConfirmDeleteModal, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteDespesa(idDespesa);
      }
    });
  }

  deleteDespesa(despesaId: number): void {
    this.painelService.delete(despesaId, 'despesa').subscribe({
      next: (hasDeleted) => {
        if (hasDeleted) {
          this.toastr.success('Deletado com sucesso!', 'Finalizado!');
        }
        this.getListDespesasPorGrupo();
      },
    });
  }
  //#endregion

  //#region metodos de suporte
  teveAlteracoes(despesa: Despesa, newDespesa: Despesa) {
    return (
      despesa.item === newDespesa.item &&
      despesa.preco === newDespesa.preco &&
      despesa.quantidade === newDespesa.quantidade &&
      despesa.fornecedor === newDespesa.fornecedor &&
      despesa.categoria.id === newDespesa.categoriaId
    );
  }

  //#endregion
}
