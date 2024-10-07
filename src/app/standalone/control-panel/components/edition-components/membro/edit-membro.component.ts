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
    ReactiveFormsModule,
  ],
})
export class EditMembroComponent implements OnInit {
  membroForm: FormGroup;

  get membroValidator() {
    return this.membroForm.controls;
  }

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditMembroComponent>,
    @Inject(MAT_DIALOG_DATA) public membro: Membro
  ) {}

  ngOnInit(): void {
    this.membroForm = this.fb.group({
      nome: [
        this.membro.nome || '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(25),
        ],
      ],
      telefone: [
        this.membro.telefone || '',
        [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(17),
          Validators.pattern(/^[\d\s()+-]*$/),
        ],
      ],
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.membroForm.valid) {
      this.dialogRef.close({ ...this.membro, ...this.membroForm.value });
    }
  }
}
