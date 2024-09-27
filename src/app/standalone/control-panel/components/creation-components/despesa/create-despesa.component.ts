import { BooleanInput } from '@angular/cdk/coercion';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { ToastrService } from 'ngx-toastr';
import { GrupoFaturaSeletorResponse } from 'src/app/core/portal/interfaces/grupo-fatura-seletor-response.interface';
import { GrupoFaturaService } from 'src/app/core/portal/services/grupo-fatura.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { EnumCategoriasMensais } from 'src/app/standalone/control-panel/enums/enum-categorias-mensais';
import { EnumValorInputFornecedor } from 'src/app/standalone/control-panel/enums/enum-input-values';
import { EnumValorInputItem } from 'src/app/standalone/control-panel/enums/enum-valor-input-item';
import { Categoria } from 'src/app/standalone/control-panel/interfaces/categoria.interface';
import { CategoriaService } from 'src/app/standalone/control-panel/services/categoria.service';
import { DespesaService } from 'src/app/standalone/control-panel/services/despesa.service';

@Component({
  selector: 'app-modal-despesa',
  templateUrl: './create-despesa.component.html',
  styleUrls: ['./create-despesa.component.scss'],
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
    MatIconModule,
  ],
})
export class CreateDespesaComponent implements OnInit {
  @Output() notificarDespesaInserida = new EventEmitter<void>();

  inputItem: string;
  inputFornecedor: string;
  valorInputItem = EnumValorInputItem;

  categorias: Categoria[] = [];
  categoriaSelecionada: string;

  grupoFaturas: GrupoFaturaSeletorResponse[];
  grupoDefault: number;
  grupoCode = this.storageService.getItem('grupo-fatura-code');

  despesaForm: FormGroup;
  get despesaValidator(): any {
    return this.despesaForm.controls;
  }

  constructor(
    private readonly categoriaService: CategoriaService,
    private readonly despesaService: DespesaService,
    private readonly grupoFaturaService: GrupoFaturaService,
    private readonly dialogRef: MatDialogRef<CreateDespesaComponent>,
    private readonly fb: FormBuilder,
    private readonly toastr: ToastrService,
    private readonly storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.validation();
    this.resetForm();
    this.getAllCategorias();
    this.getAllgrupoFaturas();
    this.definirValoresMensaisNoInput();
  }

  getCategoriaSelected(categoriaCode: any) {
    const categoria = this.categorias.find((c) => c.code === categoriaCode);
    this.categoriaSelecionada = categoria?.descricao;

    this.despesaForm.patchValue({
      item: this.setValueInputItem(),
      fornecedor: this.setValueInputFornecedor(),
      quantidade: this.setValueInputQuantidade(),
    });
  }

  definirValoresMensaisNoInput() {
    this.despesaForm.get('categoriaCode').valueChanges.subscribe((value) => {
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

  getAllgrupoFaturas() {
    this.grupoFaturaService.getListGrupoFaturaParaSeletor().subscribe({
      next: (grupoFaturas) => {
        this.grupoFaturas = grupoFaturas;
      },
    });
  }

  getAllCategorias() {
    this.categoriaService.getAll().subscribe({
      next: (categorias) => {
        this.categorias = categorias;
      },
    });
  }

  onSubmit(): void {
    if (this.despesaForm.valid) {
      this.despesaService.insert(this.despesaForm.value).subscribe({
        next: (wasInserted) => {
          if (wasInserted) {
            this.toastr.success(
              ` Despesa ${this.despesaForm.value.item} criada com sucesso!`,
              'Finalizado!'
            );
            this.resetForm();
            this.notificarDespesaInserida.emit();
          }
        },
      });
    }
  }

  public validation(): void {
    this.despesaForm = this.fb.group({
      grupoFaturaCode: [this.grupoCode, [Validators.required]],
      categoriaCode: [
        '00000000-0000-0000-0000-000000000000',
        [Validators.required],
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
      quantidade: this.setValueInputQuantidade(),
      fornecedor: this.setValueInputFornecedor(),
      categoriaCode: this.despesaForm.value.categoriaCode,
      grupoFaturaCode: this.despesaForm.value.grupoFaturaCode || this.grupoCode,
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }

  setValueInputItem(): string {
    switch (this.categoriaSelecionada) {
      case EnumCategoriasMensais.aluguel:
        this.inputItem = EnumValorInputItem.parcelaApPonto;
        break;
      case EnumCategoriasMensais.condominio:
        this.inputItem = EnumValorInputItem.condominio;
        break;
      case EnumCategoriasMensais.contaDeLuz:
        this.inputItem = EnumValorInputItem.contaDeLuz;
        break;
      case EnumCategoriasMensais.internet:
        this.inputItem = EnumValorInputItem.internet;
        break;
      default:
        this.inputItem = 'Compra';
    }
    return this.inputItem;
  }

  setValueInputQuantidade() {
    let quantidade = 1;

    if (
      this.categoriaSelecionada === EnumCategoriasMensais.contaDeLuz ||
      this.categoriaSelecionada === EnumCategoriasMensais.condominio ||
      this.categoriaSelecionada === EnumCategoriasMensais.internet ||
      this.categoriaSelecionada === EnumCategoriasMensais.aluguel
    ) {
      quantidade = 1;
    }

    return quantidade;
  }

  setValueInputFornecedor(): string {
    switch (this.inputItem) {
      case EnumValorInputItem.parcelaCaixa:
        this.inputFornecedor = EnumValorInputFornecedor.caixa;
        break;
      case EnumValorInputItem.parcelaApPonto:
      case EnumValorInputItem.condominio:
        this.inputFornecedor = EnumValorInputFornecedor.apPonto;
        break;
      case EnumValorInputItem.contaDeLuz:
        this.inputFornecedor = EnumValorInputFornecedor.cemig;
        break;
      case EnumValorInputItem.internet:
        this.inputFornecedor = EnumValorInputFornecedor.internet;
        break;
      default:
        this.inputFornecedor = this.despesaForm?.value?.fornecedor || 'Epa';
    }
    return this.inputFornecedor;
  }

  inputSomenteLeitura(): BooleanInput {
    if (
      this.categoriaSelecionada == EnumCategoriasMensais.contaDeLuz ||
      this.categoriaSelecionada == EnumCategoriasMensais.condominio ||
      this.categoriaSelecionada == EnumCategoriasMensais.internet ||
      this.categoriaSelecionada == EnumCategoriasMensais.aluguel
    ) {
      return true;
    }

    return false;
  }
}
