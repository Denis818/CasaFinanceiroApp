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
import { PainelControleService } from '../../../services/painel-controle.service';

@Component({
  selector: 'app-membro',
  templateUrl: './create-membro.modal.html',
  styleUrls: ['./create-membro.modal.scss'],
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
export class ModalMembroComponent {
  membroForm: FormGroup;

  get membroValidator(): any {
    return this.membroForm.controls;
  }

  constructor(
    private painelService: PainelControleService,
    public dialogRef: MatDialogRef<ModalMembroComponent>,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.validation();
    this.resetForm();
  }

  onSubmit(): void {
    if (this.membroForm.valid) {
      this.painelService.insert(this.membroForm.value, 'Membro').subscribe({
        next: () => {
          this.toastr.success(
            ` Membro ${this.membroForm.value.nome} criado com sucesso!`,
            'Finalizado!'
          );

          this.onClose();
          this.resetForm();
        },
      });
    }
  }

  public validation(): void {
    this.membroForm = this.fb.group({
      nome: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(25),
        ],
      ],
      telefone: [
        '',
        [Validators.required, Validators.pattern(/^\(\d{2}\) \d{5}-\d{4}$/)],
      ],
    });
  }

  resetForm(): void {
    this.membroForm.reset({
      nome: '',
      telefone: '',
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
