import { DespesaPorMembroResponse } from './despesa-por-membro-response.interface';
export interface DespesasPorMesMembroResponse {
  totalDoMes: number;
  mes: string;
  despesasPorMembros: DespesaPorMembroResponse[];
}
