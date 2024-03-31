import { Categoria } from './categoria.interface';

export interface Despesa {
  id: number;
  item: string;
  preco: number;
  quantidade: number;
  fornecedor: string;
  total: number;
  categoria: Categoria;
  dataCompra: Date;
}
