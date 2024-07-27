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
import { MembroService } from 'src/app/modules/control-panel/services/membro.service';

@Component({
  selector: 'app-membro',
  templateUrl: './create-membro.component.html',
  styleUrls: ['./create-membro.component.scss'],
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
export class CreateMembroComponent {
  membroForm: FormGroup;

  get membroValidator(): any {
    return this.membroForm.controls;
  }

  constructor(
    private readonly membroService: MembroService,
    private readonly dialogRef: MatDialogRef<CreateMembroComponent>,
    private readonly fb: FormBuilder,
    private readonly toastr: ToastrService
  ) {
    this.validation();
  }

  onSubmit(): void {
    if (this.membroForm.valid) {
      this.membroService.insert(this.membroForm.value).subscribe({
        next: (membroInserido) => {
          if (membroInserido) {
            this.toastr.success(
              ` Membro ${this.membroForm.value.nome} criado com sucesso!`,
              'Finalizado!'
            );

            this.onClose();
          }
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
        [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(17),
          Validators.pattern(/^[\d\s()+-]*$/),
        ],
      ],
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
