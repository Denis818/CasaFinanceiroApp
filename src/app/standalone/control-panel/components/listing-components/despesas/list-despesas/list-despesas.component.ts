import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import {
  AfterViewInit,
  Component,
  LOCALE_ID,
  OnDestroy,
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
import { forkJoin, Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { GrupoFatura } from 'src/app/core/portal/interfaces/grupo-fatura.interface';
import { GrupoFaturaNotification } from 'src/app/core/portal/services/grupo-fatura-notification.service';
import { GrupoFaturaService } from 'src/app/core/portal/services/grupo-fatura.service';
import { ConfirmDeleteComponent } from 'src/app/shared/components/confirm-delete/confirm-delete.component';
import { EnumFiltroDespesa } from 'src/app/shared/enums/enum-filtro-despesa';
import { ListFiltroDespesa } from 'src/app/shared/utilities/FiltroDespesa/list-filtro-despesa';
import { CustomPaginator } from 'src/app/shared/utilities/paginator/custom-paginator';
import { Pagination } from 'src/app/shared/utilities/paginator/pagination';
import { Despesa } from 'src/app/standalone/control-panel/interfaces/despesa.interface';

import { MatButtonModule } from '@angular/material/button';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { TableEditManipulation } from 'src/app/standalone/control-panel/helpers/table-edit-manipulation';
import { Categoria } from 'src/app/standalone/control-panel/interfaces/categoria.interface';
import { CategoriaService } from 'src/app/standalone/control-panel/services/categoria.service';
import { DespesaService } from 'src/app/standalone/control-panel/services/despesa.service';
import { ChecarFaturaCartaoComponent } from '../../../checar-fatura-cartao/checar-fatura-cartao.component';
import { EditDespesaComponent } from '../../../edition-components/despesa/edit-despesa.component';
import { CardDescricaoTotaisComponent } from '../card-descricao-totais/card-descricao-totais.component';
import { MetricasNotification } from '../card-descricao-totais/metricas-notification.service';
import { CardTotaisListDespesasComponent } from '../card-totais-list-despesas/card-totais-list-despesas.component';

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
    CardTotaisListDespesasComponent,
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: CustomPaginator },
    { provide: LOCALE_ID, useValue: 'pt-BR' },
  ],
})
export class ListDespesasComponent implements OnDestroy, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(CardTotaisListDespesasComponent)
  cardTotaisListDespesas: CardTotaisListDespesasComponent;

  faturaAtualName: string = '';

  private tempoParaAplicarFiltroPorItem = new Subject<string>();
  private reloadPageDespesasSubscriber: Subscription;
  private reloadPageMetricasSubscriber: Subscription;

  categorias: Categoria[] = [];
  grupoFaturas: GrupoFatura[];

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
    private readonly grupoFaturaNotification: GrupoFaturaNotification,
    private metricasNotification: MetricasNotification,
    protected readonly tableEditManipulation: TableEditManipulation,
    private readonly listFiltroDespesa: ListFiltroDespesa,
    private readonly storageService: StorageService
  ) {}

  ngAfterViewInit(): void {
    this.reloadPage();
    this.tempoParaFiltrar();
  }

  ngOnDestroy() {
    if (this.reloadPageDespesasSubscriber) {
      this.reloadPageDespesasSubscriber.unsubscribe();
    }
    if (this.reloadPageMetricasSubscriber) {
      this.reloadPageMetricasSubscriber.unsubscribe();
    }
  }

  reloadPage() {
    this.reloadPageDespesasSubscriber =
      this.grupoFaturaNotification.recarregarPaginaComNovoGrupoId.subscribe({
        next: (isReload) => {
          if (isReload) {
            this.getNameFatura();
            this.getListDespesasPorGrupo();
          }
        },
      });

    this.reloadPageMetricasSubscriber =
      this.metricasNotification.recarregarCardTotaisComNovaMetrica.subscribe({
        next: (isReload) => {
          if (isReload) {
            this.cardTotaisListDespesas?.getParametrosDeAlertasDeGastos();
          }
        },
      });
  }

  //#region Abrir Modais
  openEditMetricasModal(): void {
    this.dialog.open(CardDescricaoTotaisComponent, {});
  }

  openChecarFaturaCartaoModal(): void {
    this.dialog.open(ChecarFaturaCartaoComponent, {
      width: '450px',
    });
  }
  //#endregion

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
  }

  getNameFatura() {
    let faturaId = this.storageService.getItem('grupo-fatura-code');
    this.despesaService.getNameFatura(faturaId).subscribe({
      next: (faturaName) => {
        this.faturaAtualName = faturaName;
      },
    });
  }

  //#endregion

  //#region Update

  openEdit(despesa: Despesa): void {
    forkJoin({
      categorias: this.categoriaService.getAll(),
      grupoFaturas: this.grupoFaturaService.getListGruposFaturas(),
    }).subscribe(({ categorias, grupoFaturas }) => {
      const dialogRef = this.dialog.open(EditDespesaComponent, {
        width: '600px',
        data: {
          despesa: { ...despesa },
          categorias: categorias,
          grupoFaturas: grupoFaturas,
        },
      });

      dialogRef.afterClosed().subscribe((result: Despesa) => {
        if (result) {
          this.updateDespesa(result.code, result);
        }
      });
    });
  }

  updateDespesa(code: string, despesa: Despesa): void {
    despesa.categoriaCode = despesa.categoria.code;
    despesa.grupoFaturaCode = despesa.grupoFatura.code;

    this.despesaService.update(code, despesa).subscribe({
      next: (despesaAtualizada) => {
        if (despesaAtualizada) {
          this.toastr.success('Atualizado com sucesso!', 'Finalizado!');
          this.getListDespesasPorGrupo();
        }
      },
      error: () => this.getListDespesasPorGrupo(),
    });
  }

  //#endregion

  //#region Delete

  confirmDelete(despesaCode: string): void {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteDespesa(despesaCode);
      }
    });
  }

  deleteDespesa(despesaCode: string): void {
    this.despesaService.delete(despesaCode).subscribe({
      next: (hasDeleted) => {
        if (hasDeleted) {
          this.toastr.success('Deletado com sucesso!', 'Finalizado!');
        }
        this.getListDespesasPorGrupo();
        this.cardTotaisListDespesas.getParametrosDeAlertasDeGastos();
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

  //#endregion
}
