import { Categoria } from "./categoria.interface";

export interface Despesa {
  id: number
  item: string;
  categoria: Categoria;
  fornecedor: string;
  preco: number;
  quantidade: number;
  total: number;
  dataCompra: Date;
}
