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
import { PainelControleService } from '../../../services/painel-controle.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './modal-categoria.component.html',
  styleUrls: ['./modal-categoria.component.scss'],
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
export class ModalCategoriaComponent {
  @Output() categoriaInserida = new EventEmitter<void>();

  categoriaForm: FormGroup;

  get categoriaValidator(): any {
    return this.categoriaForm.controls;
  }

  constructor(
    private painelService: PainelControleService,
    public dialogRef: MatDialogRef<ModalCategoriaComponent>,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.validation();
    this.resetForm();
  }

  onSubmit(): void {
    if (this.categoriaForm.valid) {
      this.painelService
        .insert(this.categoriaForm.value, 'Categoria')
        .subscribe({
          next: () => {
            this.toastr.success(
              ` Categoria ${this.categoriaForm.value.descricao} criada com sucesso!`,
              'Finalizado!'
            );

            this.onClose();
            this.resetForm();
            this.categoriaInserida.emit();
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

  resetForm(): void {
    this.categoriaForm.reset({
      descricao: '',
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
