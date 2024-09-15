import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { GrupoFatura } from 'src/app/core/portal/interfaces/grupo-fatura.interface';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';

@Component({
  selector: 'app-edit-grupo-fatura',
  templateUrl: './edit-grupo-fatura.component.html',
  styleUrls: ['./edit-grupo-fatura.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatInputModule,
    ModalComponent,
    MatSelectModule,
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

  constructor(
    public dialogRef: MatDialogRef<EditGrupoFaturaComponent>,
    @Inject(MAT_DIALOG_DATA) public grupoFatura: GrupoFatura
  ) {}

  ngOnInit(): void {
    this.extrairMes();
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.grupoFatura);
  }

  extrairMes(): void {
    const regex = /Fatura de (\w+) \d{4}/;
    const match = this.grupoFatura.nome.match(regex);
    if (match) {
      this.grupoFatura.nome = match[1];
    }
  }
}
