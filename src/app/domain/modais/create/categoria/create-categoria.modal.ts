import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
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
import { PainelControleService } from 'src/app/domain/painel-controle/services/painel-controle.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './create-categoria.modal.html',
  styleUrls: ['./create-categoria.modal.scss'],
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
export class CreateCategoriaModal {
    @Output() categoriaInserida = new EventEmitter<void>();

  categoriaForm: FormGroup;

  get categoriaValidator(): any {
    return this.categoriaForm.controls;
  }

  constructor(
    private painelService: PainelControleService,
    public dialogRef: MatDialogRef<CreateCategoriaModal>,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.validation();
  }

  onSubmit(): void {
    if (this.categoriaForm.valid) {
      this.painelService
        .insert(this.categoriaForm.value, 'categoria')
        .subscribe({
          next: (categoriaInserida) => {
            if (categoriaInserida) {
              this.toastr.success(
                ` Categoria ${this.categoriaForm.value.descricao} criada com sucesso!`,
                'Finalizado!'
              );
              
              this.categoriaInserida.emit();
              this.onClose();
            }
          },
        });
    }
  }

  public validation(): void {
    this.categoriaForm = this.fb.group({
      descricao: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(25),
        ],
      ],
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
