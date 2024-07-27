import { Despesa } from 'src/app/modules/control-panel/interfaces/despesa.interface';
import { Pagination } from 'src/app/shared/utilities/paginator/pagination';
import { PaginationResponse } from 'src/app/shared/utilities/paginator/pagination-response.interface';

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
