import { BooleanInput } from '@angular/cdk/coercion';
import { Injectable } from '@angular/core';
import { Despesa } from 'src/app/standalone/control-panel/interfaces/despesa.interface';

import { EnumCategoriasMensais } from '../enums/enum-categorias-mensais';
import { EnumValorInputFornecedor } from '../enums/enum-input-values';
import { EnumValorInputItem } from '../enums/enum-valor-input-item';
import { Categoria } from '../interfaces/categoria.interface';

@Injectable({ providedIn: 'root' })
export class TableEditManipulation {
  private categoriaSelecionada: string;

  aoAlterarCategoria(
    categorias: Categoria[],
    despesa: Despesa,
    categoriaCode: string
  ) {
    const categoria = categorias.find((c) => c.code === categoriaCode);
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
      (this.categoriaSelecionada == EnumCategoriasMensais.internet &&
        inputCampo == 'fornecedor') ||
      inputCampo == 'item'
    ) {
      return false;
    }

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

  private inputItemEhFornecedor(despesa: Despesa, novaCategoria: string) {
    switch (novaCategoria) {
      case EnumCategoriasMensais.aluguel:
        this.inputItem(despesa, EnumValorInputItem.parcelaApPonto);
        this.inputFornecedor(despesa);
        this.inputQuantidade(despesa, 1);
        break;

      case EnumCategoriasMensais.condominio:
        this.inputItem(despesa, EnumValorInputItem.condominio);
        this.inputFornecedor(despesa);
        this.inputQuantidade(despesa, 1);
        break;

      case EnumCategoriasMensais.contaDeLuz:
        this.inputItem(despesa, EnumValorInputItem.contaDeLuz);
        this.inputFornecedor(despesa);
        this.inputQuantidade(despesa, 1);
        break;

      case EnumCategoriasMensais.internet:
        this.inputItem(despesa, despesa.item);
        this.inputFornecedor(despesa);
        this.inputQuantidade(despesa, 1);
        break;

      default:
        this.inputItem(despesa, despesa.item);
        if (
          novaCategoria !== EnumCategoriasMensais.aluguel &&
          novaCategoria !== EnumCategoriasMensais.condominio &&
          novaCategoria !== EnumCategoriasMensais.contaDeLuz
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
      case EnumValorInputItem.condominio:
      case EnumValorInputItem.parcelaApPonto:
        despesa.fornecedor = EnumValorInputFornecedor.apPonto;
        break;
      case EnumValorInputItem.parcelaCaixa:
        despesa.fornecedor = EnumValorInputFornecedor.caixa;
        break;
      case EnumValorInputItem.contaDeLuz:
        despesa.fornecedor = EnumValorInputFornecedor.cemig;
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
