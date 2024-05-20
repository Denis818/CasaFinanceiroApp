import { BooleanInput } from '@angular/cdk/coercion';
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
import { ValorInputItem, CategoriasMensais, ValorInputFornecedor } from 'src/app/shared/enums/enumInputValues';

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

  inputItem: string;
  inputFornecedor: string;
  valorInputItem = ValorInputItem;

  categorias: Categoria[] = [];
  categoriaSelecionada: string;

  grupoDespesas: GrupoDespesa[];
  grupoDefault: number;
  grupoId = this.storageService.getItem('grupoDespesasId');

  despesaForm: FormGroup;
  get despesaValidator(): any {
    return this.despesaForm.controls;
  }

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
    this.definirValoresMensaisNoInput();
  }

  getCategoriaSelected(categoriaId: any) {
    const categoria = this.categorias.find((c) => c.id === categoriaId);
    this.categoriaSelecionada = categoria?.descricao;

    this.despesaForm.patchValue({
      item: this.setValueInputItem(),
      fornecedor: this.setValueInputFornecedor(),
    });
  }

  definirValoresMensaisNoInput() {
    this.despesaForm.get('categoriaId').valueChanges.subscribe((value) => {
      this.getCategoriaSelected(value);
    });

    this.despesaForm.get('item').valueChanges.subscribe((value) => {
      this.inputItem = value;
      this.setValueInputFornecedor();
      this.despesaForm.patchValue({
        fornecedor: this.inputFornecedor,
      });
    });
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
        next: (despesaInserida) => {
          if (despesaInserida) {
            this.toastr.success(
              ` Despesa ${this.despesaForm.value.item} criada com sucesso!`,
              'Finalizado!'
            );
            this.resetForm();
            this.despesaInserida.emit();
          }
        },
      });
    }
  }

  public validation(): void {
    this.despesaForm = this.fb.group({
      grupoDespesaId: ['', [Validators.required]],
      categoriaId: [1, [Validators.required]],

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
        [Validators.required, Validators.min(0), Validators.max(9999.99)],
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
      item: this.setValueInputItem(),
      preco: 0,
      quantidade: 1,
      fornecedor: this.setValueInputFornecedor(),
      categoriaId: this.despesaForm.value.categoriaId || 1,
      grupoDespesaId:
        this.despesaForm.value.grupoDespesaId || parseInt(this.grupoId),
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }

  setValueInputItem(): string {
    switch (this.categoriaSelecionada) {
      case CategoriasMensais.aluguel:
        this.inputItem = ValorInputItem.parcelaApPonto;
        break;
      case CategoriasMensais.condominio:
        this.inputItem = ValorInputItem.condominio;
        break;
      case CategoriasMensais.contaDeLuz:
        this.inputItem = ValorInputItem.contaDeLuz;
        break;
      default:
        this.inputItem = 'Compra';
    }
    return this.inputItem;
  }

  setValueInputFornecedor(): string {
    switch (this.inputItem) {
      case ValorInputItem.parcelaCaixa:
        this.inputFornecedor = ValorInputFornecedor.caixa;
        break;
      case ValorInputItem.parcelaApPonto:
      case ValorInputItem.condominio:
        this.inputFornecedor = ValorInputFornecedor.apPonto;
        break;
      case ValorInputItem.contaDeLuz:
        this.inputFornecedor = ValorInputFornecedor.cemig;
        break;
      default:
        this.inputFornecedor = 'Epa';
    }
    return this.inputFornecedor;
  }

  inputSomenteLeitura(inputCampo: string = ''): BooleanInput {
    if (
      (this.categoriaSelecionada == CategoriasMensais.internet &&
        inputCampo == 'fornecedor') ||
      inputCampo == 'item'
    ) {
      return false;
    }

    if (
      this.categoriaSelecionada == CategoriasMensais.contaDeLuz ||
      this.categoriaSelecionada == CategoriasMensais.condominio ||
      this.categoriaSelecionada == CategoriasMensais.internet ||
      this.categoriaSelecionada == CategoriasMensais.aluguel
    ) {
      return true;
    }

    return false;
  }
}
