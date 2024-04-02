import { DespesaPorMembroResponse } from './despesa-por-membro-response.interface';
export interface RelatorioDespesasMensais {
  totalDoMes: number;
  mes: string;
  despesasPorMembros: DespesaPorMembroResponse[];
}
