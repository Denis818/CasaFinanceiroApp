import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Categoria } from '../../../interfaces/categoria.interface';
import { PainelControleService } from '../../../services/painel-controle.service';
import { ConfirmDeleteComponent } from '../../delete/confirm-delete.component';

@Component({
  selector: 'modal-view-categoria',
  templateUrl: './view-categoria.modal.html',
  styleUrls: ['./view-categoria.modal.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatPaginatorModule,
    FormsModule,
    MatSlideToggleModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule,
    ConfirmDeleteComponent,
  ],
})
export class ViewCategoriaModal {
  categorias: Categoria[];
  constructor(
    private painelService: PainelControleService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {
    this.getAllCategorias();
  }

  getAllCategorias() {
    this.painelService.getAll<Categoria>('categoria').subscribe({
      next: (categorias) => {
        this.categorias = categorias;
      },
    });
  }

  //#region Update
  openEdit(categoria: Categoria): void {
    categoria.isEditing = !categoria.isEditing;
  }

  updateCategoria(id: number, categoria: Categoria): void {
    this.painelService.update(id, categoria, 'Categoria').subscribe({
      next: () => {
        this.toastr.success('Atualizado com sucesso!', 'Finalizado!');
        this.getAllCategorias();
      },
    });

    categoria.isEditing = false;
  }
  //#endregion

  //#region Delete
  confirmDelete(idCategoria: number): void {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteCategoria(idCategoria);
      }
    });
  }

  deleteCategoria(categoriaId: number): void {
    this.painelService.delete(categoriaId, 'Categoria').subscribe({
      next: () => {
        this.toastr.success('Deletado com sucesso!', 'Finalizado!');
        this.getAllCategorias();
      },
    });
  }

  //#endregion
}
