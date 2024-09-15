import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { Component, Inject, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
    MatInputModule,
    MatSelectModule,
    ModalComponent,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
})
export class EditDespesaComponent {
  constructor(
    public dialogRef: MatDialogRef<EditDespesaComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      despesa: Despesa;
      categorias: Categoria[];
      grupoFaturas: GrupoFatura[];
    }
  ) {}

  despesa = this.data.despesa;
  categorias = this.data.categorias;
  grupoFaturas = this.data.grupoFaturas;

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.despesa);
  }
}
