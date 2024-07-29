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
import { CategoriaService } from 'src/app/standalone/control-panel/services/categoria.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './create-categoria.component.html',
  styleUrls: ['./create-categoria.component.scss'],
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
export class CreateCategoriaComponent {
  categoriaForm: FormGroup;

  get categoriaValidator(): any {
    return this.categoriaForm.controls;
  }

  constructor(
    private readonly categoriaService: CategoriaService,
    private readonly dialogRef: MatDialogRef<CreateCategoriaComponent>,
    private readonly fb: FormBuilder,
    private readonly toastr: ToastrService
  ) {
    this.validation();
  }

  onSubmit(): void {
    if (this.categoriaForm.valid) {
      this.categoriaService.insert(this.categoriaForm.value).subscribe({
        next: (categoriaInserida) => {
          if (categoriaInserida) {
            this.toastr.success(
              ` Categoria ${this.categoriaForm.value.descricao} criada com sucesso!`,
              'Finalizado!'
            );

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
          Validators.maxLength(50),
        ],
      ],
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
