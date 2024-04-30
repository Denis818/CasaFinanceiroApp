import { CommonModule } from '@angular/common';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
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
import { WhatsappModal } from '../../modal/util/envio-mensagem/whatsapp/whatsapp.modal';
import { ViewCategoriaModal } from '../../modal/view/view-categoria-modal/view-categoria.modal';
import { ViewDespesaModal } from '../../modal/view/view-despesa-modal/view-despesa.modal';
import { ViewMembroModal } from '../../modal/view/view-membro-modal/view-membro.modal';
import { PainelControleService } from '../../services/painel-controle.service';

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
    MatFormFieldModule,
  ],
  providers: [{ provide: MatPaginatorIntl, useClass: CustomPaginator }],
})
export class PainelControlePage {
  @ViewChild('modalForm') modalForm: TemplateRef<any>;

  faturaCartao: number;
  valorSubtraido: number = 0;
  totalDespesa: number = 0;

  constructor(
    private dialog: MatDialog,
    private painelService: PainelControleService
  ) {}

  abrirModal(template: TemplateRef<any>) {
    const dialogRef = this.dialog.open(template, {
      width: '600px',
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  calcular() {
    this.conferirFaturaDoCartao(this.faturaCartao);
  }

  conferirFaturaDoCartao(faturaCartao: number) {
    this.painelService.conferirFaturaDoCartao(faturaCartao).subscribe({
      next: (valores: any) => {
        this.valorSubtraido = valores.valorSubtraido;
        this.totalDespesa = valores.totalDespesa;
      },
    });
  }

  enviarMensagem(): void {
    this.dialog.open(WhatsappModal, {
      width: '600px',
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
