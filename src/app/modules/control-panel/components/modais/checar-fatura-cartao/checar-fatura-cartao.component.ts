import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { Component, LOCALE_ID } from '@angular/core';
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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { DespesaService } from 'src/app/modules/control-panel/services/despesa.service';

registerLocaleData(localePt);

@Component({
  selector: 'app-checar-fatura-cartao.modal',
  templateUrl: './checar-fatura-cartao.component.html',
  styleUrls: ['./checar-fatura-cartao.component.scss'],
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
    MatTooltipModule,
    MatIconModule,
    CurrencyMaskModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
})
export class ChecarFaturaCartaoComponent {
  valorSubtraido: number = 0;
  faturaCartao: number = 0;
  totalDespesa: number = 0;
  isValueCalculed: boolean = false;

  faturaForm: FormGroup;

  get faturaValidator(): any {
    return this.faturaForm.controls;
  }

  constructor(
    private readonly despesaService: DespesaService,
    private readonly dialogRef: MatDialogRef<ChecarFaturaCartaoComponent>,
    private readonly fb: FormBuilder
  ) {
    this.validation();
  }

  onSubmit(): void {
    if (this.faturaForm.valid) {
      this.faturaCartao = this.faturaForm.value.faturaCartao;

      this.despesaService.conferirFaturaDoCartao(this.faturaCartao).subscribe({
        next: (valores: any) => {
          this.valorSubtraido = valores.valorSubtraido;
          this.totalDespesa = valores.totalDespesa;
          this.isValueCalculed = true;
        },
      });
    }
  }
  public validation(): void {
    this.faturaForm = this.fb.group({
      faturaCartao: [0, [Validators.required]],
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
