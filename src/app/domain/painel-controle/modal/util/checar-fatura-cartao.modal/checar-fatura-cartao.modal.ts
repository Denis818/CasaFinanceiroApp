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
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ToastrService } from 'ngx-toastr';
import { PainelControleService } from '../../../services/painel-controle.service';

@Component({
  selector: 'app-checar-fatura-cartao.modal',
  templateUrl: './checar-fatura-cartao.modal.html',
  styleUrls: ['./checar-fatura-cartao.modal.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    FormsModule,
    MatDialogModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
})
export class ChecarFaturaCartaoModal {
  valorSubtraido: number = 0;
  totalDespesa: number = 0;

  faturaForm: FormGroup;

  get faturaValidator(): any {
    return this.faturaForm.controls;
  }

  constructor(
    private painelService: PainelControleService,
    public dialogRef: MatDialogRef<ChecarFaturaCartaoModal>,
    private fb: FormBuilder
  ) {
    this.validation();
  }

  onSubmit(): void {
    if (this.faturaForm.valid) {
      this.painelService
        .conferirFaturaDoCartao(this.faturaForm.value.faturaCartao)
        .subscribe({
          next: (valores: any) => {
            this.valorSubtraido = valores.valorSubtraido;
            this.totalDespesa = valores.totalDespesa;
          },
        });
    }
  }
  public validation(): void {
    this.faturaForm = this.fb.group({
      faturaCartao: ['', [Validators.required]],
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
