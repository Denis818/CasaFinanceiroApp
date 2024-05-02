import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { Component, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Despesa } from 'src/app/domain/painel-controle/interfaces/despesa.interface';
import { PainelControleService } from 'src/app/domain/painel-controle/services/painel-controle.service';
import { CustomPaginator } from 'src/app/shared/utilities/paginator/custom-paginator';
import { Pagination } from 'src/app/shared/utilities/paginator/pagination';
import { ConfirmDeleteModal } from '../../utilities/delete/confirm-delete.modal';

registerLocaleData(localePt);

@Component({
  selector: 'view-despesas',
  templateUrl: './view-despesa.modal.html',
  styleUrls: ['./view-despesa.modal.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatPaginatorModule,
    FormsModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule,
    MatInputModule,
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: CustomPaginator },
    { provide: LOCALE_ID, useValue: 'pt-BR' },
  ],
})
export class ViewDespesaModal {
  despesas: Despesa[];
  despesasFiltradas: Despesa[];
  filtroTexto: string = '';

  tamanhosDePagina: number[] = [5, 10, 50, 100];
  page: Pagination = {
    totalItens: 0,
    paginaAtual: 1,
    itensPorPagina: this.tamanhosDePagina[1],
  };

  constructor(
    private painelService: PainelControleService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {
    this.getAllDespesas();
  }

  //#region Filters
  filterDespesas() {
    if (this.filtroTexto.trim() === '') {
      this.despesasFiltradas = this.despesas;
    } else {
      this.despesasFiltradas = this.despesas.filter((despesa) =>
        despesa.item.toLowerCase().includes(this.filtroTexto.toLowerCase())
      );
    }
  }

  filtrarDespesas() {
    this.filterDespesas();
  }
  //#endregion

  //#region Gets
  getAllDespesas() {
    this.painelService
      .getAllDespesas(this.page.paginaAtual, this.page.itensPorPagina)
      .subscribe((data) => {
        this.despesas = data.itens;
        this.despesasFiltradas = data.itens;
        this.page.totalItens = data.totalItens;
        this.page.paginaAtual = data.paginaAtual;
      });
  }

  mudarPagina(event: PageEvent): void {
    this.page.paginaAtual = event.pageIndex + 1;
    this.page.itensPorPagina = event.pageSize;
    this.getAllDespesas();
  }
  //#endregion

  //#region Update
  openEdit(despesa: Despesa): void {
    despesa.isEditing = !despesa.isEditing;
  }

  columEdit(despesa: Despesa) {
    this.updateDespesa(despesa.id, despesa);
  }

  updateDespesa(id: number, despesa: Despesa): void {
    despesa.categoriaId = despesa.categoria.id;
    this.painelService.update(id, despesa, 'Despesa').subscribe({
      next: () => {
        this.toastr.success('Atualizado com sucesso!', 'Finalizado!');
        this.getAllDespesas();
      },
      error: () => this.getAllDespesas(),
    });

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
    this.painelService.delete(despesaId, 'Despesa').subscribe({
      next: () => {
        this.toastr.success('Deletado com sucesso!', 'Finalizado!');
        this.getAllDespesas();
      },
    });
  }
  //#endregion
}