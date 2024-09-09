import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Title } from '@angular/platform-browser';
import { CustomPaginator } from 'src/app/shared/utilities/paginator/custom-paginator';
import { CreateCategoriaComponent } from '../../components/creation-components/categoria/create-categoria.component';
import { CreateDespesaComponent } from '../../components/creation-components/despesa/create-despesa.component';
import { CreategrupoFaturaComponent } from '../../components/creation-components/grupo-fatura/create-grupo-fatura.component';
import { CreateMembroComponent } from '../../components/creation-components/membro/create-membro.component';
import { ListCategoriaComponent } from '../../components/listing-components/categoria/list-categoria.component';
import { ListDespesasComponent } from '../../components/listing-components/despesas/list-despesas/list-despesas.component';
import { ListgrupoFaturaComponent } from '../../components/listing-components/grupo-fatura/list-grupo-fatura.component';
import { ListMembroComponent } from '../../components/listing-components/membro/list-membro.component';
import { ListProdutoListaComprasComponent } from '../../components/listing-components/produto-lista-compras/list-produto-lista-compras.component';
import { CreateProdutoListaComprasComponent } from '../../components/creation-components/produto-lista-compras/create-produto-lista-compras.component';

@Component({
  selector: 'control-panel-page',
  templateUrl: './control-panel.page.html',
  styleUrls: ['./control-panel.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ListDespesasComponent,
    CreateDespesaComponent,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ],
  providers: [{ provide: MatPaginatorIntl, useClass: CustomPaginator }],
})
export class ControlPanelPage {
  constructor(
    private readonly dialog: MatDialog,
    public readonly titleService: Title
  ) {}

  @ViewChild(ListDespesasComponent) listDespesaModal: ListDespesasComponent;

  //#region  Lists
  openListProdutoListaComprasModal() {
    const dialogRef = this.dialog.open(ListProdutoListaComprasComponent, {
      width: '400px',
    });

    dialogRef.afterClosed();
  }

  openListCategoriaModal() {
    const dialogRef = this.dialog.open(ListCategoriaComponent, {
      width: '650px',
    });

    dialogRef.componentInstance.notificarCategoriaAtualizada.subscribe(() => {
      this.listDespesaModal.getListDespesasPorGrupo();
    });

    dialogRef.afterClosed();
  }

  openListMembroModal() {
    const dialogRef = this.dialog.open(ListMembroComponent, {
      width: '800px',
    });
    dialogRef.afterClosed();
  }

  openListgrupoFaturasModal() {
    const dialogRef = this.dialog.open(ListgrupoFaturaComponent, {
      width: '1000px',
    });
    dialogRef.afterClosed();
  }
  //#endregion

  //#region Create
  openCreateDespesaModal(): void {
    const dialogRef = this.dialog.open(CreateDespesaComponent, {
      width: '400px',
    });

    dialogRef.componentInstance.notificarDespesaInserida.subscribe(() => {
      this.listDespesaModal.getListDespesasPorGrupo();
    });
  }

  openCreategrupoFaturaModal(): void {
    this.dialog.open(CreategrupoFaturaComponent, {
      width: '400px',
    });
  }

  openCreateMembroModal(): void {
    this.dialog.open(CreateMembroComponent, {
      width: '400px',
    });
  }

  openCreateCategoriaModal(): void {
    this.dialog.open(CreateCategoriaComponent, {
      width: '400px',
    });
  }

  openCreateProdutoListaComprasModal(): void {
    this.dialog.open(CreateProdutoListaComprasComponent, {
      width: '400px',
    });
  }
  //#endregion
}
