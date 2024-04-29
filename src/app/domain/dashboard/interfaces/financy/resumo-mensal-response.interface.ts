import { DespesaPorMembroResponse } from './despesa-por-membro-response.interface';
import { RelatorioGastosDoMesResponse } from './relatorio-gastos-mes-response.interface';

export interface ResumoMensalResponse {
  relatorioGastosDoMes: RelatorioGastosDoMesResponse;
  despesasPorMembro: DespesaPorMembroResponse[];
}
