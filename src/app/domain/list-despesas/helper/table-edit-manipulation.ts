import { Injectable } from '@angular/core';
import { Categoria } from '../../painel-controle/interfaces/categoria.interface';
import { Despesa } from '../../painel-controle/interfaces/despesa.interface';

@Injectable({ providedIn: 'root' })
export class TableEditManipulation {
  private readonly ALUGUEL = 'Aluguel';
  private readonly CONDOMINIO = 'Condomínio';

  onCategoriaChange(
    categorias: Categoria[],
    despesa: Despesa,
    categoriaId: number
  ) {
    const categoria = categorias.find((c) => c.id === categoriaId);
    const novaCategoria = categoria?.descricao;

    // Atualiza a descrição da categoria na despesa
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
    if (novaCategoria === this.ALUGUEL) {
      this.salvarValorAnteriorEAtualizar(despesa, 'Parcela Ap Ponto');
    } else if (novaCategoria === this.CONDOMINIO) {
      this.salvarValorAnteriorEAtualizar(despesa, 'Condomínio');
    } else {
      // Para outras categorias, configura o item como 'Compra'
      this.salvarValorAnteriorEAtualizar(despesa, 'Compra');
      // Se estava em 'Aluguel' ou 'Condomínio' e mudou para outra categoria, restaura o valor anterior apenas se necessário
      if (
        categoriaAnterior === this.ALUGUEL ||
        categoriaAnterior === this.CONDOMINIO
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
