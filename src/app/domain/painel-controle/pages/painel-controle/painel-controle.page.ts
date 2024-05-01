import { CommonModule } from '@angular/common';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { CustomPaginator } from 'src/app/shared/utilities/paginator/custom-paginator';
import { ModalCategoriaComponent } from '../../modal/create/categoria/create-categoria.modal';
import { ModalDespesaComponent } from '../../modal/create/despesa/create-despesa.modal';
import { ModalMembroComponent } from '../../modal/create/membro/create-membro.modal';
import { ChecarFaturaCartaoModal } from '../../modal/util/checar-fatura-cartao.modal/checar-fatura-cartao.modal';
import { WhatsappModal } from '../../modal/util/envio-mensagem/whatsapp/whatsapp.modal';
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
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    FormsModule,
    MatDialogModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
  ],
  providers: [{ provide: MatPaginatorIntl, useClass: CustomPaginator }],
})
export class PainelControlePage {
  @ViewChild('modalForm') modalForm: TemplateRef<any>;

  faturaCartao: number;
  valorSubtraido: number = 0;
  totalDespesa: number = 0;

  constructor(private dialog: MatDialog) {}

  enviarMensagem(): void {
    this.dialog.open(WhatsappModal, {
      width: '600px',
    });
  }

  openModalChecarFaturaCartao(): void {
    this.dialog.open(ChecarFaturaCartaoModal, {
      width: '400px',
    });
  }

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
    this.dialog.open(ModalDespesaComponent, {
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
