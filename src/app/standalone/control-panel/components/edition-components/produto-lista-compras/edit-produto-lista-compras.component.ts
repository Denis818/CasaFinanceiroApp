import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { ProdutoListaCompras } from '../../../interfaces/produto-lista-compras.interface';

@Component({
  selector: 'app-edit-produto-lista-compras',
  templateUrl: './edit-produto-lista-compras.component.html',
  styleUrls: ['./edit-produto-lista-compras.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatInputModule,
    ModalComponent,
  ],
})
export class EditProdutoListaComprasComponent {
  constructor(
    public dialogRef: MatDialogRef<EditProdutoListaComprasComponent>,
    @Inject(MAT_DIALOG_DATA) public produtoListaCompras: ProdutoListaCompras
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.produtoListaCompras);
  }
}
