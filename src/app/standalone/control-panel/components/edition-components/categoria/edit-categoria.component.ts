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
    ReactiveFormsModule,
  ],
})
export class EditCategoriaComponent implements OnInit {
  categoriaForm: FormGroup;

  get categoriaValidator() {
    return this.categoriaForm.controls;
  }

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditCategoriaComponent>,
    @Inject(MAT_DIALOG_DATA) public categoria: Categoria
  ) {}

  ngOnInit(): void {
    this.categoriaForm = this.fb.group({
      descricao: [
        this.categoria.descricao,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.categoriaForm.valid) {
      this.dialogRef.close({ ...this.categoria, ...this.categoriaForm.value });
    }
  }
}
