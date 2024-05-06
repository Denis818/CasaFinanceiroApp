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
import { HomeService } from 'src/app/core/services/home/home-service';

@Component({
  selector: 'app-membro',
  templateUrl: './create-grupo-despesa.modal.html',
  styleUrls: ['./create-grupo-despesa.modal.scss'],
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
export class CreateGrupoDespesaModal {
  grupoDespesaForm: FormGroup;

  get grupoDespesaValidator(): any {
    return this.grupoDespesaForm.controls;
  }
  constructor(
    private homeService: HomeService,
    public dialogRef: MatDialogRef<CreateGrupoDespesaModal>,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.validation();
  }

  onSubmit(): void {
    if (this.grupoDespesaForm.valid) {
      this.homeService.insert(this.grupoDespesaForm.value).subscribe({
        next: (grupoInserido) => {
          if (grupoInserido) {
            this.toastr.success(
              `Grupo ${this.grupoDespesaForm.value.nome} criado com sucesso!`,
              'Finalizado!'
            );

            this.onClose();
          }
        },
      });
    }
  }

  public validation(): void {
    this.grupoDespesaForm = this.fb.group({
      nome: [
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
