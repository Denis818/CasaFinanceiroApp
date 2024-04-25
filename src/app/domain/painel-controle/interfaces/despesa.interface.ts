import { Categoria } from './categoria.interface';

export class Despesa {
  id: number;
  dataCompra: Date;
  item: string;
  preco: number;
  quantidade: number;
  fornecedor: string;
  total: number;
  categoria: Categoria;
  categoriaId: number;
  isEditing?: boolean = false;
}
