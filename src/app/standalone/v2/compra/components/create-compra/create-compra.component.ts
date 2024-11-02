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
import { ToastrService } from 'ngx-toastr';
import { CompraService } from '../../services/compras.service';
import { CurrencyMaskModule } from 'ng2-currency-mask';

@Component({
  selector: 'app-create-compra',
  templateUrl: './create-compra.component.html',
  styleUrls: ['./create-compra.component.css'],
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
export class CreateCompraComponent implements OnInit {
  compraForm: FormGroup;

  get compraValidator(): any {
    return this.compraForm.controls;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly dialogRef: MatDialogRef<CreateCompraComponent>,
    private readonly compraService: CompraService,
    private readonly fb: FormBuilder,
    private readonly toastr: ToastrService
  ) {}

  ngOnInit() {
    this.validation();
  }

  onSubmit() {
    if (this.compraForm.valid) {
      const compraPayload = {
        ...this.compraForm.value,
        dividioPorDois: this.data.divididoPorDois,
      };

      this.compraService.insert(compraPayload).subscribe({
        next: (compraInserida) => {
          if (compraInserida) {
            this.toastr.success(
              ` Compra ${compraPayload.nome} criada com sucesso!`,
              'Finalizado!'
            );
            this.dialogRef.close(true);
          }
        },
      });
    }
  }

  public validation(): void {
    this.compraForm = this.fb.group({
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
