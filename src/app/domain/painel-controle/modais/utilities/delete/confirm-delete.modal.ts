import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'confirm-delete',
  templateUrl: './confirm-delete.modal.html',
  styleUrls: ['./confirm-delete.modal.scss'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatDividerModule, MatIconModule],
})
export class ConfirmDeleteModal {
  constructor(
    private dialogRef: MatDialogRef<ConfirmDeleteModal>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
}
