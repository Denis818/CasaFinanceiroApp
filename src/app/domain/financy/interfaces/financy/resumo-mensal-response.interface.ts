import { RelatorioGastosDoMesResponse } from './relatorio-gastos-mes-response.interface';
import { TotalPorMembroResponse } from './total-por-membro-response.interface';

export interface ResumoMensalResponse {
  relatorioGastosDoMes: RelatorioGastosDoMesResponse;
  despesasPorMembros: TotalPorMembroResponse[];
}
