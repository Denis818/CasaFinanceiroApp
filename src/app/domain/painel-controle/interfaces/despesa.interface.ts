import { GrupoFatura } from 'src/app/core/interfaces/grupo-fatura.interface';
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
  grupoFatura: GrupoFatura;
  categoriaId: number;
  grupoFaturaId: number;
  isDespesaEditing: boolean;
}
