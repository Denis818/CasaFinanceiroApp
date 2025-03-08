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
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { GrupoFatura } from 'src/app/core/portal/interfaces/grupo-fatura.interface';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';

@Component({
  selector: 'app-edit-grupo-fatura',
  templateUrl: './edit-grupo-fatura.component.html',
  styleUrls: ['./edit-grupo-fatura.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatInputModule,
    ModalComponent,
    MatSelectModule,
    CurrencyMaskModule,
  ],
})
export class EditGrupoFaturaComponent implements OnInit {
  meses = [
    { viewValue: 'Janeiro' },
    { viewValue: 'Fevereiro' },
    { viewValue: 'Março' },
    { viewValue: 'Abril' },
    { viewValue: 'Maio' },
    { viewValue: 'Junho' },
    { viewValue: 'Julho' },
    { viewValue: 'Agosto' },
    { viewValue: 'Setembro' },
    { viewValue: 'Outubro' },
    { viewValue: 'Novembro' },
    { viewValue: 'Dezembro' },
  ];

  grupoFaturaForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditGrupoFaturaComponent>,
    @Inject(MAT_DIALOG_DATA) public grupoFatura: GrupoFatura,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.validation();
  }

  public validation(): void {
    const mes = this.extrairMes(this.grupoFatura?.nome) || 'Janeiro'; // Extrai o mês do nome da fatura
    this.grupoFaturaForm = this.fb.group({
      nome: [mes, [Validators.required]],
      desconto: [this.grupoFatura?.desconto || 0, [Validators.min(0)]],
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.grupoFaturaForm.valid) {
      this.dialogRef.close({
        ...this.grupoFatura,
        ...this.grupoFaturaForm.value,
      });
    }
  }

  extrairMes(nome: string): string {
    if (!nome) return null;

    const regex = /Fatura de ([A-Za-zÀ-ÖØ-öø-ÿ]+) \d{4}/;
    const match = nome.match(regex);

    if (match) {
      nome = match[1];
    }

    return nome;
  }
}
