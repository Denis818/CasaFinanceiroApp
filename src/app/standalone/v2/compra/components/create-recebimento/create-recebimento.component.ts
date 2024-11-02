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
import { RecebimentoService } from '../../services/recebimento.service';

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
  selector: 'app-create-recebimento',
  templateUrl: './create-recebimento.component.html',
  styleUrls: ['./create-recebimento.component.css'],
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
export class CreateRecebimentoComponent implements OnInit {
  recebimentoForm: FormGroup;

  get recebimentoValidator(): any {
    return this.recebimentoForm.controls;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly dialogRef: MatDialogRef<CreateRecebimentoComponent>,
    private readonly recebimentoService: RecebimentoService,
    private readonly fb: FormBuilder,
    private readonly toastr: ToastrService
  ) {}

  ngOnInit() {
    this.validation();
  }

  onSubmit() {
    if (this.recebimentoForm.valid) {
      const formattedData = this.recebimentoForm.value;

      // Formata a data no padrão 'dd/MM/yyyy'
      if (formattedData.data) {
        formattedData.data = moment(formattedData.data).format('DD/MM/YYYY');
      }

      this.recebimentoService.insert(formattedData).subscribe({
        next: (recebimentoInserido) => {
          if (recebimentoInserido) {
            this.toastr.success(`Adicionado com sucesso!`, 'Finalizado!');
            this.dialogRef.close(true);
          }
        },
      });
    }
  }

  public validation(): void {
    this.recebimentoForm = this.fb.group({
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
