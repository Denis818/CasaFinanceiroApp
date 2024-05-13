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
import { Subscription } from 'rxjs';
import { GrupoDespesa } from 'src/app/core/interfaces/grupo-despesa.interface';
import { HomeService } from 'src/app/core/services/home/home-service';
import { Despesa } from 'src/app/domain/painel-controle/interfaces/despesa.interface';
import { PainelControleService } from 'src/app/domain/painel-controle/services/painel-controle.service';
import { CustomPaginator } from 'src/app/shared/utilities/paginator/custom-paginator';
import { Pagination } from 'src/app/shared/utilities/paginator/pagination';
import { ConfirmDeleteModal } from '../modais/utilities/delete/confirm-delete.modal';
import { Categoria } from '../painel-controle/interfaces/categoria.interface';
import { TableEditManipulation } from './helper/table-edit-manipulation';

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

  private reloadPageSubscriber: Subscription;

  categorias: Categoria[] = [];
  grupoDespesas: GrupoDespesa[];

  despesasFiltradas: Despesa[];
  filtroPorItem: string = '';

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
    this.inicializeTable();
    this.reloadDespesas();
  }

  ngOnDestroy() {
    if (this.reloadPageSubscriber) {
      this.reloadPageSubscriber.unsubscribe();
    }
  }

  //#region Gets
  aplicarFiltro() {
    this.page.paginaAtual = 1;
    if (this.paginator) {
      this.paginator.pageIndex = 0;
    }
    this.getListDespesas();
  }

  getListDespesas() {
    this.painelService
      .filtrarDespesaPorItem(
        this.filtroPorItem.toLocaleLowerCase(),
        this.page.paginaAtual,
        this.page.itensPorPagina
      )
      .subscribe((listPaginada) => {
        this.despesasFiltradas = listPaginada.itens;
        this.page.totalItens = listPaginada.totalItens;
        this.page.paginaAtual = listPaginada.paginaAtual;

        if (listPaginada.itens.length === 0) {
          this.toastr.warning(
            `Não foi encontrada uma despesa com filtro: ${this.filtroPorItem}.`,
            'Aviso'
          );
        }
      });
  }

  inicializeTable() {
    this.getListDespesas();
    this.getAllCategorias();
    this.getAllGrupoDespesas();
  }

  getAllGrupoDespesas() {
    this.homeService.getAll().subscribe({
      next: (grupoDespesas) => {
        this.grupoDespesas = grupoDespesas;
      },
    });
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
            this.inicializeTable();
          }
        },
      });
  }

  mudarPagina(event: PageEvent): void {
    this.page.paginaAtual = event.pageIndex + 1;
    this.page.itensPorPagina = event.pageSize;
    this.getListDespesas();
  }
  //#endregion

  //#region Update
  originalDespesas: Despesa;
  openEdit(despesa: Despesa): void {
    despesa.isEditing = !despesa.isEditing;
    this.originalDespesas = JSON.parse(JSON.stringify(despesa));
  }

  cancelEdit(despesa: Despesa) {
    despesa.isEditing = false;
  }

  updateDespesa(id: number, despesa: Despesa): void {
    despesa.categoriaId = despesa.categoria.id;
    despesa.grupoDespesaId = despesa.grupoDespesa.id;

    if (!this.teveAlteracoes(this.originalDespesas, despesa)) {
      this.painelService.update(id, despesa, 'despesa').subscribe({
        next: (despesaAtualizada) => {
          if (despesaAtualizada) {
            this.toastr.success('Atualizado com sucesso!', 'Finalizado!');
          }
          this.getListDespesas();
        },
        error: () => this.getListDespesas(),
      });
    }

    despesa.isEditing = false;
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
        this.getListDespesas();
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
