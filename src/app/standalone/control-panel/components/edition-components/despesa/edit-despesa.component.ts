import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { GrupoFatura } from 'src/app/core/portal/interfaces/grupo-fatura.interface';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { Categoria } from '../../../interfaces/categoria.interface';
import { Despesa } from '../../../interfaces/despesa.interface';

registerLocaleData(localePt);

@Component({
  selector: 'app-edit-despesa',
  templateUrl: './edit-despesa.component.html',
  styleUrls: ['./edit-despesa.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CurrencyMaskModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    ModalComponent,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
})
export class EditDespesaComponent implements OnInit {
  despesaForm: FormGroup;

  get despesaValidator() {
    return this.despesaForm.controls;
  }

  categorias = this.data.categorias;
  grupoFaturas = this.data.grupoFaturas;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditDespesaComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      despesa: Despesa;
      categorias: Categoria[];
      grupoFaturas: GrupoFatura[];
    }
  ) {}

  ngOnInit(): void {
    this.despesaForm = this.fb.group({
      grupoFaturaCode: [
        this.data.despesa.grupoFatura?.code || '',
        [Validators.required],
      ],
      categoriaCode: [
        this.data.despesa.categoria?.code ||
          '00000000-0000-0000-0000-000000000000',
        [Validators.required],
      ],
      item: [
        this.data.despesa.item || '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(80),
        ],
      ],
      preco: [
        this.data.despesa.preco || '',
        [Validators.required, Validators.min(0), Validators.max(9999.99)],
      ],
      quantidade: [
        this.data.despesa.quantidade || '',
        [
          Validators.required,
          Validators.pattern('^[0-9]+$'),
          Validators.min(1),
          Validators.max(99999),
        ],
      ],
      fornecedor: [
        this.data.despesa.fornecedor || '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(80),
        ],
      ],
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.despesaForm.valid) {
      this.dialogRef.close({
        ...this.data.despesa,
        ...this.despesaForm.value,
      });
    }
  }
}
