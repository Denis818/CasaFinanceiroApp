import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { CustomPaginator } from 'src/app/shared/utilities/paginator/custom-paginator';
import { Pagination } from 'src/app/shared/utilities/paginator/pagination';
import { ModalViewCategoria } from '../../modal/Read/modal-view-categoria/modal-view-categoria.component';
import { ModalViewMembro } from '../../modal/Read/modal-view-membro/modal-view-membro.component';
import { ModalCategoriaComponent } from '../../modal/create/categoria/modal-categoria.component';
import { ModalDespesaComponent } from '../../modal/create/despesa/modal-despesa.component';
import { ModalMembroComponent } from '../../modal/create/membro/modal-membro.component';
import { ConfirmDeleteComponent } from '../../modal/delete/confirm-delete.component';
import { PainelControleService } from '../../services/painel-controle.service';
import { Despesa } from './../../interfaces/despesa.interface';

@Component({
  selector: 'app-painel-controle-page',
  templateUrl: './painel-controle.page.html',
  styleUrls: ['./painel-controle.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatPaginatorModule,
    FormsModule,
    MatSlideToggleModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule,
    ModalDespesaComponent,
    ModalMembroComponent,
    ConfirmDeleteComponent,
    ModalCategoriaComponent,
    ModalViewCategoria,
    ModalViewMembro,
  ],
  providers: [{ provide: MatPaginatorIntl, useClass: CustomPaginator }],
})
export class PainelControlePage implements OnInit {
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
  ) {}

  ngOnInit(): void {
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

  onInputChange() {
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

  viewCategorias() {
    const dialogRef = this.dialog.open(ModalViewCategoria, {
      width: '400px',
    });
    dialogRef.afterClosed();
  }

  viewMembros() {
    const dialogRef = this.dialog.open(ModalViewMembro, {
      width: '400px',
    });
    dialogRef.afterClosed();
  }

  mudarPagina(event: PageEvent): void {
    this.page.paginaAtual = event.pageIndex + 1;
    this.page.itensPorPagina = event.pageSize;
    this.getAllDespesas();
  }
  //#endregion

  //#region Create
  openModalInsertDespesa(): void {
    const dialogRef = this.dialog.open(ModalDespesaComponent, {
      width: '400px',
    });
    dialogRef.componentInstance.despesaInserida.subscribe(() => {
      this.getAllDespesas();
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

  //#region Update
  openEdit(despesa: Despesa): void {
    despesa.isEditing = !despesa.isEditing;
  }

  updateDespesa(id: number, despesa: Despesa): void {
    despesa.categoriaId = despesa.categoria.id;
    this.painelService.update(id, despesa, 'Despesa').subscribe({
      next: () => {
        this.toastr.success('Atualizado com sucesso!', 'Finalizado!');
        this.getAllDespesas();
      },
    });

    despesa.isEditing = false;
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
    this.painelService.delete(despesaId, 'Despesa').subscribe({
      next: () => {
        this.toastr.success('Deletado com sucesso!', 'Finalizado!');
        this.getAllDespesas();
      },
    });
  }
  //#endregion
}
