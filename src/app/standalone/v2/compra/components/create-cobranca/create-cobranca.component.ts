import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { ToastrService } from 'ngx-toastr';
import { CobrancaService } from '../../services/cobranca.service';

@Component({
  selector: 'app-create-cobranca',
  templateUrl: './create-cobranca.component.html',
  styleUrls: ['./create-cobranca.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    CurrencyMaskModule,
  ],
})
export class CreateCobrancaComponent implements OnInit {
  cobrancaForm: FormGroup;

  get cobrancaValidator(): any {
    return this.cobrancaForm.controls;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly dialogRef: MatDialogRef<CreateCobrancaComponent>,
    private readonly cobrancaService: CobrancaService,
    private readonly fb: FormBuilder,
    private readonly toastr: ToastrService
  ) {}

  ngOnInit() {
    this.validation();
  }

  onSubmit() {
    if (this.cobrancaForm.valid) {
      const cobrancaPayload = {
        ...this.cobrancaForm.value,
        dividioPorDois: this.data.divididoPorDois,
      };

      this.cobrancaService.insert(cobrancaPayload).subscribe({
        next: (cobrancaInserida) => {
          if (cobrancaInserida) {
            this.toastr.success(
              ` cobranca ${cobrancaPayload.nome} criada com sucesso!`,
              'Finalizado!'
            );
            this.dialogRef.close(true);
          }
        },
      });
    }
  }

  public validation(): void {
    this.cobrancaForm = this.fb.group({
      nome: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      parcelas: ['', [Validators.required]],
      valorTotal: ['', [Validators.required]],
    });
  }

  onClose() {
    this.dialogRef.close();
  }
}
