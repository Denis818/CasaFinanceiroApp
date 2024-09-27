import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ToastrService } from 'ngx-toastr';
import { GrupoFaturaNotification } from 'src/app/core/portal/services/grupo-fatura-notification.service';
import { GrupoFaturaService } from 'src/app/core/portal/services/grupo-fatura.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';

@Component({
  selector: 'app-membro',
  templateUrl: './create-grupo-fatura.component.html',
  styleUrls: ['./create-grupo-fatura.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
  ],
})
export class CreategrupoFaturaComponent implements OnInit {
  grupoFaturaForm: FormGroup;
  userInput: string = '';

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

  get grupoFaturaValidator(): any {
    return this.grupoFaturaForm.controls;
  }
  constructor(
    private readonly grupoFaturaService: GrupoFaturaService,
    private readonly grupoFaturaNotification: GrupoFaturaNotification,
    private readonly dialogRef: MatDialogRef<CreategrupoFaturaComponent>,
    private readonly fb: FormBuilder,
    private readonly toastr: ToastrService,
    private readonly storageService: StorageService
  ) {}
  
  ngOnInit(): void {
    this.validation();
  }
  onSubmit(): void {
    if (this.grupoFaturaForm.valid) {
      let grupoFatura = {
        ...this.grupoFaturaForm.value,
        ano:
          this.storageService.getItem('ano') ||
          new Date().getFullYear().toString(),
      };

      this.grupoFaturaService.insert(grupoFatura).subscribe({
        next: (grupoInserido) => {
          if (grupoInserido) {
            this.grupoFaturaNotification.notificarAlteracaoNoSeletorGrupoFatura();
            this.toastr.success(
              `Fatura de ${this.grupoFaturaForm.value.nome} criado com sucesso!`,
              'Finalizado!'
            );

            this.onClose();
          }
        },
      });
    }
  }

  public validation(): void {
    this.grupoFaturaForm = this.fb.group({
      nome: ['Janeiro', [Validators.required]],
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
