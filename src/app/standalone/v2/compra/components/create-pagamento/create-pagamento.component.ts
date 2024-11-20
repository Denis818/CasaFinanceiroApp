import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MatMomentDateModule,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import moment from 'moment';
import 'moment/locale/pt-br';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { ToastrService } from 'ngx-toastr';
import { PagamentoService } from '../../services/pagamento.service';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-create-pagamento',
  templateUrl: './create-pagamento.component.html',
  styleUrls: ['./create-pagamento.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    CurrencyMaskModule,
    MatInputModule,
    MatDatepickerModule,
    MatMomentDateModule,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: 'LL',
        },
        display: {
          dateInput: 'LL',
          monthYearLabel: 'MMM YYYY',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'MMMM YYYY',
        },
      },
    },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
  ],
})
export class CreatePagamentoComponent implements OnInit {
  pagamentoForm: FormGroup;

  get pagamentoValidator(): any {
    return this.pagamentoForm.controls;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly dialogRef: MatDialogRef<CreatePagamentoComponent>,
    private readonly pagamentoService: PagamentoService,
    private readonly fb: FormBuilder,
    private readonly toastr: ToastrService
  ) {}

  ngOnInit() {
    this.validation();
  }

  onSubmit() {
    if (this.pagamentoForm.valid) {
      const formattedData = this.pagamentoForm.value;

      // Formata a data no padrão 'dd/MM/yyyy'
      if (formattedData.data) {
        formattedData.data = moment(formattedData.data).format('DD/MM/YYYY');
      }

      this.pagamentoService.insert(formattedData).subscribe({
        next: (pagamentoInserido) => {
          if (pagamentoInserido) {
            this.toastr.success(`Adicionado com sucesso!`, 'Finalizado!');
            this.dialogRef.close(true);
          }
        },
      });
    }
  }

  public validation(): void {
    this.pagamentoForm = this.fb.group({
      valor: [
        '',
        [Validators.required, Validators.min(1.0), Validators.max(9999.99)],
      ],
      data: ['', [Validators.required]],
    });
  }

  onClose() {
    this.dialogRef.close();
  }
}
