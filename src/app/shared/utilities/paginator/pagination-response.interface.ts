export interface PaginationResponse<TEntity> {
  totalItens: number;
  paginaAtual: number;
  itens: TEntity[];
}
