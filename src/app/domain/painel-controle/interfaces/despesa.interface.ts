import { GrupoDespesa } from 'src/app/core/interfaces/grupo-despesa.interface';
import { Categoria } from './categoria.interface';

export interface Despesa {
  id: number;
  dataCompra: Date;
  item: string;
  preco: number;
  quantidade: number;
  fornecedor: string;
  total: number;
  categoria: Categoria;
  grupoDespesa: GrupoDespesa;
  categoriaId: number;
  grupoDespesaId: number;
  isDespesaEditing: boolean;
}
