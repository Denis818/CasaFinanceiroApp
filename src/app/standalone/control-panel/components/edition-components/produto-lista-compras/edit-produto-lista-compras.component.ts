import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
    ReactiveFormsModule,
  ],
})
export class EditProdutoListaComprasComponent implements OnInit {
  produtoListaComprasForm: FormGroup;

  get produtoValidator() {
    return this.produtoListaComprasForm.controls;
  }

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditProdutoListaComprasComponent>,
    @Inject(MAT_DIALOG_DATA) public produtoListaCompras: ProdutoListaCompras
  ) {}

  ngOnInit(): void {
    this.produtoListaComprasForm = this.fb.group({
      item: [
        this.produtoListaCompras.item || '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
    });
  }

  onSave(): void {
    if (this.produtoListaComprasForm.valid) {
      this.dialogRef.close({
        ...this.produtoListaCompras,
        ...this.produtoListaComprasForm.value,
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
