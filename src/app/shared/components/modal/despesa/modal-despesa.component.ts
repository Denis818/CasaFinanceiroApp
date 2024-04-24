import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { ToastrService } from 'ngx-toastr';
import { Categoria } from 'src/app/domain/painel-controle/interfaces/categoria.interface';
import { PainelControleService } from 'src/app/domain/painel-controle/services/painel-controle.service';

@Component({
  selector: 'app-modal-despesa',
  templateUrl: './modal-despesa.component.html',
  styleUrls: ['./modal-despesa.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
})
export class ModalDespesaComponent {
  despesaForm: FormGroup;
  get vendaValidator(): any {
    return this.despesaForm.controls;
  }

  @Output() despesaInserida = new EventEmitter<void>();

  categorias: Categoria[] = [];

  constructor(
    private painelService: PainelControleService,
    public dialogRef: MatDialogRef<ModalDespesaComponent>,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.validation();
    this.resetForm();
    this.getAllCategorias();
  }

  getAllCategorias() {
    this.painelService.getAll<Categoria>('Categoria').subscribe({
      next: (categorias) => {
        this.categorias = categorias;
      },
    });
  }

  onSubmit(): void {
    if (this.despesaForm.valid) {
      this.painelService.insert(this.despesaForm.value, 'Despesa').subscribe({
        next: () => {
          this.toastr.success(
            'Alterações realizadas com sucesso!',
            'Finalizado!'
          );

          this.resetForm();
          this.despesaInserida.emit();
        },
      });
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }

  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }
  id: number;
  dataCompra: Date;
  item: string;
  preco: number;
  quantidade: number;
  fornecedor: string;
  total: number;
  categoria: Categoria;
  categoriaId: number;

  public validation(): void {
    this.despesaForm = this.fb.group({
      dataCompra: ['', [Validators.required]],
      categoriaId: [
        '',
        [Validators.required, Validators.pattern('^[1-9][0-9]*$')],
      ],

      item: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(80),
        ],
      ],
      preco: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9,.]+$'),
          Validators.min(0.01),
          Validators.max(99999),
        ],
      ],
      quantidade: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]+$'),
          Validators.min(1),
          Validators.max(99999),
        ],
      ],
      fornecedor: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(80),
        ],
      ],
    });
  }

  resetForm(): void {
    this.despesaForm.reset({
      item: 'item',
      preco: 0.01,
      quantidade: 1,
      fornecedor: 'Epa',
      categoriaId: this.despesaForm?.value?.categoriaId,
      dataCompra: this.formatDate(new Date()),
    });
  }
}
