import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CustomPaginator } from 'src/app/shared/utilities/paginator/custom-paginator';
import { ListDespesasComponent } from '../../list-despesas/list-despesas.component';
import { CreateCategoriaModal } from '../../modais/create/categoria/create-categoria.modal';
import { CreateDespesaModal } from '../../modais/create/despesa/create-despesa.modal';
import { CreateGrupoDespesaModal } from '../../modais/create/grupo-despesa/create-grupo-despesa.modal';
import { CreateMembroModal } from '../../modais/create/membro/create-membro.modal';
import { ListCategoriaModal } from '../../modais/list/list-categoria/list-categoria.modal';
import { ListGrupoDespesaModal } from '../../modais/list/list-grupo-despesa/list-grupo-despesa.modal';
import { ListMembroModal } from '../../modais/list/list-membro/list-membro.modal';
import { ChecarFaturaCartaoModal } from '../../modais/utilities/checar-fatura-cartao/checar-fatura-cartao.modal';

@Component({
  selector: 'painel-controle-page',
  templateUrl: './painel-controle.page.html',
  styleUrls: ['./painel-controle.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ListDespesasComponent,
    CreateDespesaModal,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ],
  providers: [{ provide: MatPaginatorIntl, useClass: CustomPaginator }],
})
export class PainelControlePage {
  constructor(private dialog: MatDialog) {}

  @ViewChild(ListDespesasComponent) ListDespesaModal: ListDespesasComponent;

  //#region  Lists
  openListCategoriaModal() {
    const dialogRef = this.dialog.open(ListCategoriaModal, {
      width: '400px',
    });

    dialogRef.afterClosed();
  }

  openListMembroModal() {
    const dialogRef = this.dialog.open(ListMembroModal, {
      width: '400px',
    });
    dialogRef.afterClosed();
  }

  openListGrupoDespesasModal() {
    const dialogRef = this.dialog.open(ListGrupoDespesaModal, {
      width: '400px',
    });
    dialogRef.afterClosed();
  }
  //#endregion

  //#region Create
  openCreateDespesaModal(): void {
    const dialogRef = this.dialog.open(CreateDespesaModal, {
      width: '400px',
    });

    dialogRef.componentInstance.despesaInserida.subscribe(() => {
      this.ListDespesaModal.getListDespesasPorGrupo();
    });
  }

  openCreateGrupoDespesaModal(): void {
    this.dialog.open(CreateGrupoDespesaModal, {
      width: '400px',
    });
  }

  openCreateMembroModal(): void {
    this.dialog.open(CreateMembroModal, {
      width: '400px',
    });
  }

  openCreateCategoriaModal(): void {
    this.dialog.open(CreateCategoriaModal, {
      width: '400px',
    });
  }
  //#endregion

  openChecarFaturaCartaoModal(): void {
    this.dialog.open(ChecarFaturaCartaoModal, {
      width: '450px',
    });
  }
}
