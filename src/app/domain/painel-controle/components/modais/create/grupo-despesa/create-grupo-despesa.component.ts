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
import { GrupoDespesaService } from 'src/app/core/services/grupo-despesa.service';
import { GrupoDespesaNotification } from 'src/app/core/utilities/grupo-despesa-notification';

@Component({
  selector: 'app-membro',
  templateUrl: './create-grupo-despesa.component.html',
  styleUrls: ['./create-grupo-despesa.component.scss'],
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
export class CreateGrupoDespesaComponent {
  grupoDespesaForm: FormGroup;
  userInput: string = '';

  get grupoDespesaValidator(): any {
    return this.grupoDespesaForm.controls;
  }
  constructor(
    private readonly grupoDespesaService: GrupoDespesaService,
    private readonly grupoDespesaNotification: GrupoDespesaNotification,
    private readonly dialogRef: MatDialogRef<CreateGrupoDespesaComponent>,
    private readonly fb: FormBuilder,
    private readonly toastr: ToastrService
  ) {
    this.validation();
  }

  onSubmit(): void {
    if (this.grupoDespesaForm.valid) {
      this.grupoDespesaService.insert(this.grupoDespesaForm.value).subscribe({
        next: (grupoInserido) => {
          if (grupoInserido) {
            this.grupoDespesaNotification.recarregarListaGrupoDespesa();
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
