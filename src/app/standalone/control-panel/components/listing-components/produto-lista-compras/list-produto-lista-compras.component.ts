import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
import { ProdutoListaCompras } from '../../../interfaces/produto-lista-compras.interface';
import { ProdutoListaComprasService } from '../../../services/produto-lista-compras.service';
import { CreateProdutoListaComprasComponent } from '../../creation-components/produto-lista-compras/create-produto-lista-compras.component';
import { EditProdutoListaComprasComponent } from '../../edition-components/produto-lista-compras/edit-produto-lista-compras.component';

@Component({
  selector: 'app-produto-lista-compras',
  templateUrl: './list-produto-lista-compras.component.html',
  styleUrls: ['./list-produto-lista-compras.component.scss'],
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
export class ListProdutoListaComprasComponent {
  produtoListaComprasAtual: ProdutoListaCompras;
  isEditing: boolean = false;

  produtoListaCompras: ProdutoListaCompras[] = [];

  constructor(
    private readonly produtoListaComprasService: ProdutoListaComprasService,
    private readonly toastr: ToastrService,
    private readonly dialog: MatDialog,
    private readonly dialogRef: MatDialogRef<ListProdutoListaComprasComponent>
  ) {
    this.getAllProdutoListaCompras();
  }

  getAllProdutoListaCompras() {
    this.produtoListaComprasService.getAll().subscribe({
      next: (produtoListaCompras) => {
        this.produtoListaCompras = produtoListaCompras;
      },
    });
  }

  //#region  Create
  openCreateProdutoListaComprasModal(): void {
    const dialogRef = this.dialog.open(CreateProdutoListaComprasComponent, {
      width: '400px',
    });

    dialogRef.componentInstance.notificarItemAdicionadoListaCompras.subscribe(
      () => {
        this.getAllProdutoListaCompras();
      }
    );
  }
  //#endregion

  //#region Update
  openEdit(produtoListaCompras: ProdutoListaCompras): void {
    const dialogRef = this.dialog.open(EditProdutoListaComprasComponent, {
      width: '450px',
      data: { ...produtoListaCompras },
    });

    dialogRef.afterClosed().subscribe((result: ProdutoListaCompras) => {
      if (result) {
        this.updateProdutoListaCompras(result.code, result);
      }
    });
  }

  updateProdutoListaCompras(
    code: string,
    produtoListaCompras: ProdutoListaCompras
  ): void {
    this.produtoListaComprasService
      .update(code, produtoListaCompras)
      .subscribe({
        next: (produtoListaComprasAtualizada) => {
          if (produtoListaComprasAtualizada) {
            this.toastr.success('Atualizado com sucesso!', 'Finalizado!');
          }
          this.getAllProdutoListaCompras();
        },
        error: () => this.getAllProdutoListaCompras(),
      });
  }

  //#endregion

  //#region Delete
  confirmDelete(code: string): void {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '380px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteProdutoListaCompras(code);
      }
    });
  }

  deleteProdutoListaCompras(code: string): void {
    this.produtoListaComprasService.delete(code).subscribe({
      next: (hasDeleted) => {
        if (hasDeleted) {
          this.toastr.success('Deletado com sucesso!', 'Finalizado!');
        }
        this.getAllProdutoListaCompras();
      },
    });
  }

  //#endregion

  exportaPdfListaCompras() {
    this.produtoListaComprasService.exportarPdfListaCompras();
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
