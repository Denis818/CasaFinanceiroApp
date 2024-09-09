import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { ToastrService } from 'ngx-toastr';
import { ProdutoListaComprasService } from '../../../services/produto-lista-compras.service';

@Component({
  selector: 'app-produto-lista-compras',
  templateUrl: './create-produto-lista-compras.component.html',
  styleUrls: ['./create-produto-lista-compras.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
  ],
})
export class CreateProdutoListaComprasComponent {
  produtoListaComprasForm: FormGroup;

  get produtoListaComprasValidator(): any {
    return this.produtoListaComprasForm.controls;
  }

  constructor(
    private readonly produtoListaComprasService: ProdutoListaComprasService,
    private readonly dialogRef: MatDialogRef<CreateProdutoListaComprasComponent>,
    private readonly fb: FormBuilder,
    private readonly toastr: ToastrService
  ) {
    this.validation();
  }

  onSubmit(): void {
    if (this.produtoListaComprasForm.valid) {
      this.produtoListaComprasService
        .insert(this.produtoListaComprasForm.value)
        .subscribe({
          next: (produtoListaComprasInserida) => {
            if (produtoListaComprasInserida) {
              this.toastr.success(
                ` Item ${this.produtoListaComprasForm.value.item} adicionado com sucesso!`,
                'Finalizado!'
              );

              this.onClose();
            }
          },
        });
    }
  }

  public validation(): void {
    this.produtoListaComprasForm = this.fb.group({
      item: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
