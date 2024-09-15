import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { Membro } from '../../../interfaces/membro.interface';

@Component({
  selector: 'app-edit-membro',
  templateUrl: './edit-membro.component.html',
  styleUrls: ['./edit-membro.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatInputModule,
    ModalComponent,
  ],
})
export class EditMembroComponent {
  constructor(
    public dialogRef: MatDialogRef<EditMembroComponent>,
    @Inject(MAT_DIALOG_DATA) public membro: Membro
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.membro);
  }
}
