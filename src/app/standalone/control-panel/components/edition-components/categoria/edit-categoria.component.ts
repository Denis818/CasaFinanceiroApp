import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { Categoria } from '../../../interfaces/categoria.interface';

@Component({
  selector: 'app-edit-categoria',
  templateUrl: './edit-categoria.component.html',
  styleUrls: ['./edit-categoria.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatInputModule,
    ModalComponent,
  ],
})
export class EditCategoriaComponent implements OnInit {
  ngOnInit() {}
  constructor(
    public dialogRef: MatDialogRef<EditCategoriaComponent>,
    @Inject(MAT_DIALOG_DATA) public categoria: Categoria
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.categoria);
  }
}
