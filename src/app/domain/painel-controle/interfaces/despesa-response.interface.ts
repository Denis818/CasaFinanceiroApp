import { Categoria } from './categoria.interface';

export interface DespesaResponse {
  id: number;
  dataCompra: Date;
  item: string;
  preco: number;
  quantidade: number;
  fornecedor: string;
  total: number;
  categoria: Categoria;
}
