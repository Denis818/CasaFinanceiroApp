import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CreateCategoriaModal } from 'src/app/domain/modais/create/categoria/create-categoria.modal';
import { CreateDespesaModal } from 'src/app/domain/modais/create/despesa/create-despesa.modal';
import { CreateMembroModal } from 'src/app/domain/modais/create/membro/create-membro.modal';
import { ChecarFaturaCartaoModal } from 'src/app/domain/modais/utilities/checar-fatura-cartao/checar-fatura-cartao.modal';
import { ViewCategoriaModal } from 'src/app/domain/modais/view/view-categoria/view-categoria.modal';
import { ViewDespesaModal } from 'src/app/domain/modais/view/view-despesa/view-despesa.modal';
import { ViewMembroModal } from 'src/app/domain/modais/view/view-membro/view-membro.modal';
import { CustomPaginator } from 'src/app/shared/utilities/paginator/custom-paginator';

@Component({
  selector: 'painel-controle-page',
  templateUrl: './painel-controle.page.html',
  styleUrls: ['./painel-controle.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ViewDespesaModal,
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

  @ViewChild(ViewDespesaModal) viewDespesaModal: ViewDespesaModal;

  //#region  Views
  openViewCategoriaModal() {
    const dialogRef = this.dialog.open(ViewCategoriaModal, {
      width: '400px',
    });
    dialogRef.afterClosed();
  }

  openViewMembroModal() {
    const dialogRef = this.dialog.open(ViewMembroModal, {
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
      this.viewDespesaModal.getAllDespesas();
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
      width: '400px',
    });
  }
}
