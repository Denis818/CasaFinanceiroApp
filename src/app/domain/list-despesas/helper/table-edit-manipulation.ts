import { Injectable } from '@angular/core';
import { Categoria } from '../../painel-controle/interfaces/categoria.interface';
import { Despesa } from '../../painel-controle/interfaces/despesa.interface';

@Injectable({ providedIn: 'root' })
export class TableEditManipulation {
  private readonly aluguel = 'Aluguel';
  private readonly condominio = 'Condomínio';

  onCategoriaChange(
    categorias: Categoria[],
    despesa: Despesa,
    categoriaId: number
  ) {
    const categoria = categorias.find((c) => c.id === categoriaId);
    const novaCategoria = categoria?.descricao;

    this.atualizarItemDespesa(
      despesa,
      novaCategoria,
      despesa.categoria.descricao
    );
    despesa.categoria.descricao = novaCategoria;
  }

  private atualizarItemDespesa(
    despesa: any,
    novaCategoria: string,
    categoriaAnterior: string
  ) {
    if (novaCategoria === this.aluguel) {
      this.salvarValorAnteriorEAtualizar(despesa, 'Parcela Ap Ponto');
    } else if (novaCategoria === this.condominio) {
      this.salvarValorAnteriorEAtualizar(despesa, 'Condomínio');
    } else {
      this.salvarValorAnteriorEAtualizar(despesa, 'Compra');
      if (
        categoriaAnterior === this.aluguel ||
        categoriaAnterior === this.condominio
      ) {
        this.restaurarValorAnterior(despesa);
      }
    }
  }

  private salvarValorAnteriorEAtualizar(despesa: any, novoItem: string) {
    if (despesa.item !== novoItem) {
      despesa.valorAnteriorItem = despesa.item;
      despesa.item = novoItem;
    }
  }

  private restaurarValorAnterior(despesa: any) {
    if (
      despesa.valorAnteriorItem &&
      (despesa.item === 'Parcela Ap Ponto' || despesa.item === 'Condomínio')
    ) {
      despesa.item = despesa.valorAnteriorItem;
    }
  }
}
