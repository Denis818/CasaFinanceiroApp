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
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { ToastrService } from 'ngx-toastr';
import { GrupoDespesa } from 'src/app/core/interfaces/grupo-despesa.interface';
import { HomeService } from 'src/app/core/services/home/home-service';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { Categoria } from 'src/app/domain/painel-controle/interfaces/categoria.interface';
import { PainelControleService } from 'src/app/domain/painel-controle/services/painel-controle.service';

@Component({
  selector: 'app-modal-despesa',
  templateUrl: './create-despesa.modal.html',
  styleUrls: ['./create-despesa.modal.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    CurrencyMaskModule,
    MatSelectModule,
  ],
})
export class CreateDespesaModal {
  @Output() despesaInserida = new EventEmitter<void>();

  constructor(
    private painelService: PainelControleService,
    private homeService: HomeService,
    public dialogRef: MatDialogRef<CreateDespesaModal>,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private readonly storageService: StorageService
  ) {
    this.validation();
    this.resetForm();
    this.getAllCategorias();
    this.getAllGrupoDespesas();
  }

  categorias: Categoria[] = [];
  categoriaSelecionada: string;

  grupoDespesas: GrupoDespesa[];
  grupoDefault: number;
  grupoId = this.storageService.getItem('grupoDespesasId');

  despesaForm: FormGroup;
  get despesaValidator(): any {
    return this.despesaForm.controls;
  }

  getCategoriaSelected(categoriaId: any) {
    const categoria = this.categorias.find((c) => c.id === categoriaId);
    this.categoriaSelecionada = categoria?.descricao;
  }

  getAllGrupoDespesas() {
    this.homeService.getAll().subscribe({
      next: (grupoDespesas) => {
        this.grupoDespesas = grupoDespesas;
      },
    });
  }

  getAllCategorias() {
    this.painelService.getAll<Categoria>('categoria').subscribe({
      next: (categorias) => {
        this.categorias = categorias;
      },
    });
  }

  onSubmit(): void {
    if (this.despesaForm.valid) {
      this.painelService.insert(this.despesaForm.value, 'despesa').subscribe({
        next: () => {
          this.toastr.success(
            ` Despesa ${this.despesaForm.value.item} criada com sucesso!`,
            'Finalizado!'
          );
          this.resetForm();
          this.despesaInserida.emit();
        },
      });
    }
  }

  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  public validation(): void {
    this.despesaForm = this.fb.group({
      grupoDespesaId: ['', [Validators.required]],
      categoriaId: [1, [Validators.required]],

      item: [
        'Compra',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(80),
        ],
      ],
      preco: [
        [Validators.required, Validators.min(0.01), Validators.max(9999.99)],
      ],
      quantidade: [
        1,
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
    console.log(this.grupoDefault);
    this.despesaForm.reset({
      item: 'Compra',
      quantidade: 1,
      fornecedor: this.despesaForm.value.fornecedor || 'Epa',
      categoriaId: this.despesaForm.value.categoriaId || 1,
      grupoDespesaId:
        this.despesaForm.value.grupoDespesaId || parseInt(this.grupoId),
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
