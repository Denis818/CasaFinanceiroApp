import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ToastrService } from 'ngx-toastr';
import { Categoria } from 'src/app/domain/painel-controle/interfaces/categoria.interface';
import { CategoriaService } from 'src/app/domain/painel-controle/services/categoria.service';
import { ConfirmDeleteComponent } from '../../delete/confirm-delete.component';

@Component({
  selector: 'modal-listcategoria',
  templateUrl: './list-categoria.component.html',
  styleUrls: ['./list-categoria.component.scss'],
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
    MatTooltipModule,
  ],
})
export class ListCategoriaComponent {
  @Output() notificarCategoriaAtualizada = new EventEmitter<void>();

  categoriaAtual: Categoria;
  isEditing: boolean = false;

  categorias: Categoria[] = [];
  constructor(
    private readonly categoriaService: CategoriaService,
    private readonly toastr: ToastrService,
    private readonly dialog: MatDialog
  ) {
    this.getAllCategorias();
  }

  getAllCategorias() {
    this.categoriaService.getAll().subscribe({
      next: (categorias) => {
        this.categorias = categorias;
      },
    });
  }

  //#region Update
  openEdit(categoria: Categoria): void {
    if (!this.isEditing) {
      this.isEditing = true;
      categoria.isEditing = !categoria.isEditing;
      this.categoriaAtual = JSON.parse(JSON.stringify(categoria));
    }
  }

  cancelEdit(categoria: Categoria) {
    Object.assign(categoria, this.categoriaAtual);
    this.resetPropertys(categoria);
  }

  updateCategoria(id: number, categoria: Categoria): void {
    if (!this.categoriaAlterada(categoria)) {
      this.categoriaService.update(id, categoria).subscribe({
        next: (categoriaAtualizada) => {
          if (categoriaAtualizada) {
            this.toastr.success('Atualizado com sucesso!', 'Finalizado!');
            this.notificarCategoriaAtualizada.emit();
          }

          this.getAllCategorias();
        },
        error: () => this.getAllCategorias(),
      });
    }

    this.resetPropertys(categoria);
  }

  isEditable(descricao: string): boolean {
    return (
      descricao !== 'Almoço/Janta' &&
      descricao !== 'Aluguel' &&
      descricao !== 'Condomínio' &&
      descricao !== 'Conta de Luz' &&
      descricao !== 'Internet'
    );
  }
  //#endregion

  //#region Delete
  confirmDelete(idCategoria: number): void {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '400px',
      data: {
        descricao:
          'Apagar a categoria irá deletar todas as despesas relacionadas a ela, deseja continuar?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteCategoria(idCategoria);
      }
    });
  }

  deleteCategoria(categoriaId: number): void {
    this.categoriaService.delete(categoriaId).subscribe({
      next: (hasDeleted) => {
        if (hasDeleted) {
          this.toastr.success('Deletado com sucesso!', 'Finalizado!');
          this.notificarCategoriaAtualizada.emit();
        }
        this.getAllCategorias();
      },
    });
  }

  //#endregion

  categoriaAlterada(categoria: Categoria) {
    return this.categoriaAtual.descricao === categoria.descricao;
  }
  resetPropertys(categoria: Categoria) {
    categoria.isEditing = false;
    this.isEditing = false;
    this.categoriaAtual = null;
  }
}
