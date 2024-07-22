import { BooleanInput } from '@angular/cdk/coercion';
import { Injectable } from '@angular/core';
import { Despesa } from 'src/app/domain/painel-controle/interfaces/despesa.interface';

import {
  CategoriasMensais,
  ValorInputFornecedor,
  ValorInputItem,
} from 'src/app/shared/enums/enum-input-values';
import { Categoria } from '../interfaces/categoria.interface';

@Injectable({ providedIn: 'root' })
export class TableEditManipulation {
  private categoriaSelecionada: string;

  aoAlterarCategoria(
    categorias: Categoria[],
    despesa: Despesa,
    categoriaId: number
  ) {
    const categoria = categorias.find((c) => c.id === categoriaId);
    const novaCategoria = categoria?.descricao;

    this.inputItemEhFornecedor(despesa, novaCategoria);

    despesa.categoria.descricao = novaCategoria;
    this.categoriaSelecionada = novaCategoria;
  }

  aoAlterarItem(despesa: Despesa) {
    this.inputFornecedor(despesa);
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

  private inputItemEhFornecedor(despesa: Despesa, novaCategoria: string) {
    switch (novaCategoria) {
      case CategoriasMensais.aluguel:
        this.inputItem(despesa, ValorInputItem.parcelaApPonto);
        this.inputFornecedor(despesa);
        this.inputQuantidade(despesa, 1);
        break;

      case CategoriasMensais.condominio:
        this.inputItem(despesa, ValorInputItem.condominio);
        this.inputFornecedor(despesa);
        this.inputQuantidade(despesa, 1);
        break;

      case CategoriasMensais.contaDeLuz:
        this.inputItem(despesa, ValorInputItem.contaDeLuz);
        this.inputFornecedor(despesa);
        this.inputQuantidade(despesa, 1);
        break;

      case CategoriasMensais.internet:
        this.inputItem(despesa, despesa.item);
        this.inputFornecedor(despesa);
        this.inputQuantidade(despesa, 1);
        break;

      default:
        this.inputItem(despesa, despesa.item);
        if (
          novaCategoria !== CategoriasMensais.aluguel &&
          novaCategoria !== CategoriasMensais.condominio &&
          novaCategoria !== CategoriasMensais.contaDeLuz
        ) {
          this.restaurarValorAnterior(despesa);
        }
        break;
    }
  }

  private inputItem(despesa: any, inputItem: string = null) {
    if (inputItem && despesa.item !== inputItem) {
      if (!despesa.valorAnteriorItem) {
        despesa.valorAnteriorItem = despesa.item;
      }
      despesa.item = inputItem;
    }
  }

  private inputQuantidade(despesa: any, novaQuantidade: number = null) {
    if (novaQuantidade && despesa.quantidade !== novaQuantidade) {
      if (!despesa.valorAnteriorQuantidade) {
        despesa.valorAnteriorQuantidade = despesa.quantidade;
      }
      despesa.quantidade = novaQuantidade;
    }
  }

  private inputFornecedor(despesa: any) {
    if (!despesa.valorAnteriorFornecedor) {
      despesa.valorAnteriorFornecedor = despesa.fornecedor;
    }

    switch (despesa.item) {
      case ValorInputItem.condominio:
      case ValorInputItem.parcelaApPonto:
        despesa.fornecedor = ValorInputFornecedor.apPonto;
        break;
      case ValorInputItem.parcelaCaixa:
        despesa.fornecedor = ValorInputFornecedor.caixa;
        break;
      case ValorInputItem.contaDeLuz:
        despesa.fornecedor = ValorInputFornecedor.cemig;
        break;
    }
  }

  private restaurarValorAnterior(despesa: any) {
    if (despesa.valorAnteriorItem) {
      despesa.item = despesa.valorAnteriorItem;
    }

    if (despesa.valorAnteriorQuantidade) {
      despesa.quantidade = despesa.valorAnteriorQuantidade;
    }

    if (despesa.valorAnteriorFornecedor) {
      despesa.fornecedor = despesa.valorAnteriorFornecedor;
    }
  }
}
