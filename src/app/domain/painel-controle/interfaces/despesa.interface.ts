export interface Despesa {
  item: string;
  preco: number;
  quantidade: number;
  fornecedor: string;
  total: number;
  categoriaId: number;
  dataCompra: Date;
}
