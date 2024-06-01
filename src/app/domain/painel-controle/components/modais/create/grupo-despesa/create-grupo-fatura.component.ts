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
import { grupoFaturaNotification } from 'src/app/core/services/grupo-fatura-notification.service';
import { GrupoFaturaService } from 'src/app/core/services/grupo-fatura.service';

@Component({
  selector: 'app-membro',
  templateUrl: './create-grupo-fatura.component.html',
  styleUrls: ['./create-grupo-fatura.component.scss'],
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
export class CreategrupoFaturaComponent {
  grupoFaturaForm: FormGroup;
  userInput: string = '';

  get grupoFaturaValidator(): any {
    return this.grupoFaturaForm.controls;
  }
  constructor(
    private readonly grupoFaturaService: GrupoFaturaService,
    private readonly grupoFaturaNotification: grupoFaturaNotification,
    private readonly dialogRef: MatDialogRef<CreategrupoFaturaComponent>,
    private readonly fb: FormBuilder,
    private readonly toastr: ToastrService
  ) {
    this.validation();
  }

  onSubmit(): void {
    if (this.grupoFaturaForm.valid) {
      this.grupoFaturaService.insert(this.grupoFaturaForm.value).subscribe({
        next: (grupoInserido) => {
          if (grupoInserido) {
            this.grupoFaturaNotification.recarregarListagrupoFatura();
            this.toastr.success(
              `Grupo ${this.grupoFaturaForm.value.nome} criado com sucesso!`,
              'Finalizado!'
            );

            this.onClose();
          }
        },
      });
    }
  }

  public validation(): void {
    this.grupoFaturaForm = this.fb.group({
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
