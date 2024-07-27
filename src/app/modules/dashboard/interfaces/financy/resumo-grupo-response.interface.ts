import { DespesaPorMembroResponse } from './despesa-por-membro-response.interface';
import { RelatorioGastosDoGrupoResponse } from './relatorio-gastos-grupo-response.interface';

export interface ResumoGrupoResponse {
  relatorioGastosDoGrupo: RelatorioGastosDoGrupoResponse;
  despesasPorMembro: DespesaPorMembroResponse[];
}
