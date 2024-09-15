import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDeleteComponent } from 'src/app/shared/components/confirm-delete/confirm-delete.component';
import { Categoria } from 'src/app/standalone/control-panel/interfaces/categoria.interface';
import { CategoriaService } from 'src/app/standalone/control-panel/services/categoria.service';
import { EditCategoriaComponent } from '../../edition-components/categoria/edit-categoria.component';

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

  categorias: Categoria[] = [];
  constructor(
    private readonly categoriaService: CategoriaService,
    private readonly dialogRef: MatDialogRef<ListCategoriaComponent>,
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
    const dialogRef = this.dialog.open(EditCategoriaComponent, {
      width: '400px',
      data: { ...categoria },
    });

    dialogRef.afterClosed().subscribe((result: Categoria) => {
      if (result) {
        this.updateCategoria(result.code, result);
      }
    });
  }

  updateCategoria(code: string, categoria: Categoria): void {
    this.categoriaService.update(code, categoria).subscribe({
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
  confirmDelete(code: string): void {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '380px',
      data: {
        descricao:
          'Apagar a categoria irá deletar todas as despesas relacionadas a ela, deseja continuar?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteCategoria(code);
      }
    });
  }

  deleteCategoria(code: string): void {
    this.categoriaService.delete(code).subscribe({
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

  onClose(): void {
    this.dialogRef.close();
  }
}
