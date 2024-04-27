import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { CustomPaginator } from 'src/app/shared/utilities/paginator/custom-paginator';
import { ModalCategoriaComponent } from '../../modal/create/categoria/create-categoria.modal';
import { ModalDespesaComponent } from '../../modal/create/despesa/create-despesa.modal';
import { ModalMembroComponent } from '../../modal/create/membro/create-membro.modal';
import { ViewCategoriaModal } from '../../modal/view/view-categoria-modal/view-categoria.modal';
import { ViewDespesaModal } from '../../modal/view/view-despesa-modal/view-despesa.modal';
import { ViewMembroModal } from '../../modal/view/view-membro-modal/view-membro.modal';

@Component({
  selector: 'app-painel-controle-page',
  templateUrl: './painel-controle.page.html',
  styleUrls: ['./painel-controle.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ViewCategoriaModal,
    ViewMembroModal,
    ViewDespesaModal,
  ],
  providers: [{ provide: MatPaginatorIntl, useClass: CustomPaginator }],
})
export class PainelControlePage {
  constructor(private dialog: MatDialog) {}

  //#region  Views
  viewCategorias() {
    const dialogRef = this.dialog.open(ViewCategoriaModal, {
      width: '400px',
    });
    dialogRef.afterClosed();
  }

  viewMembros() {
    const dialogRef = this.dialog.open(ViewMembroModal, {
      width: '400px',
    });
    dialogRef.afterClosed();
  }
  //#endregion

  //#region Create
  openModalInsertDespesa(): void {
    const dialogRef = this.dialog.open(ModalDespesaComponent, {
      width: '400px',
    });
  }

  openModalInserirMembro(): void {
    this.dialog.open(ModalMembroComponent, {
      width: '400px',
    });
  }

  openModalInsertCategoria(): void {
    this.dialog.open(ModalCategoriaComponent, {
      width: '400px',
    });
  }
  //#endregion
}
