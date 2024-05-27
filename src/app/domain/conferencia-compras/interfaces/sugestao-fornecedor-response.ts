import { Pagination } from 'src/app/shared/utilities/paginator/pagination';
import { PaginationResponse } from 'src/app/shared/utilities/paginator/pagination-response.interface';
import { Despesa } from '../../painel-controle/interfaces/despesa.interface';

export class SugestaoDeFornecedorResponse {
  sugestao: string;
  listaItens: PaginationResponse<Despesa>;
  
  expanded: boolean = false;
  page: Pagination = {
    totalItens: 0,
    paginaAtual: 1,
    itensPorPagina: 5,
  };
}
