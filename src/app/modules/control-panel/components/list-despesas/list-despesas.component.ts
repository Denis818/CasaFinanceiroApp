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
import { GrupoFatura } from 'src/app/core/home/interfaces/grupo-fatura.interface';
import { grupoFaturaNotification } from 'src/app/core/home/services/grupo-fatura-notification.service';
import { GrupoFaturaService } from 'src/app/core/home/services/grupo-fatura.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { Despesa } from 'src/app/modules/control-panel/interfaces/despesa.interface';
import { ListFiltroDespesa } from 'src/app/shared/utilities/FiltroDespesa/list-filtro-despesa';
import { CustomPaginator } from 'src/app/shared/utilities/paginator/custom-paginator';
import { Pagination } from 'src/app/shared/utilities/paginator/pagination';
import { TableEditManipulation } from '../../helpers/table-edit-manipulation';
import { Categoria } from '../../interfaces/categoria.interface';
import { CategoriaService } from '../../services/categoria.service';
import { DespesaService } from '../../services/despesa.service';
import { ChecarFaturaCartaoComponent } from '../modais/checar-fatura-cartao/checar-fatura-cartao.component';
import { ConfirmDeleteComponent } from '../modais/delete/confirm-delete.component';
import { EnumFiltroDespesa } from 'src/app/shared/enums/enum-filtro-despesa';

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
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: CustomPaginator },
    { provide: LOCALE_ID, useValue: 'pt-BR' },
  ],
})
export class ListDespesasComponent implements OnDestroy, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  faturaAtualName: string = '';

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

  constructor(
    private readonly despesaService: DespesaService,
    private readonly categoriaService: CategoriaService,
    private readonly grupoFaturaService: GrupoFaturaService,
    private readonly toastr: ToastrService,
    private readonly dialog: MatDialog,
    private readonly grupoFaturaNotification: grupoFaturaNotification,
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

  getNameFatura() {
    let faturaId = parseInt(this.storageService.getItem('grupoFaturaId'));
    this.despesaService.getNameFatura(faturaId).subscribe({
      next: (faturaName) => {
        this.faturaAtualName = faturaName;
      },
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

  reloadDespesas() {
    this.reloadPageSubscriber =
      this.grupoFaturaNotification.recarregarPaginaComNovoGrupoId.subscribe({
        next: (isReload) => {
          if (isReload) {
            this.getListDespesasPorGrupo();
            this.getNameFatura();
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

  openChecarFaturaCartaoModal(): void {
    this.dialog.open(ChecarFaturaCartaoComponent, {
      width: '450px',
    });
  }

  //#region Metodos de suporte

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
