import { Categoria } from "./Categoria";

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
