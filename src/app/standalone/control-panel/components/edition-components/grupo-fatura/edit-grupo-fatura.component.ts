import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
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
  ],
})
export class EditGrupoFaturaComponent {
  constructor(
    public dialogRef: MatDialogRef<EditGrupoFaturaComponent>,
    @Inject(MAT_DIALOG_DATA) public grupoFatura: GrupoFatura
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.grupoFatura);
  }
}
