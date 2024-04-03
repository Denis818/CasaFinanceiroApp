import { TotalPorMembroResponse } from './total-por-membro-response.interface';
export interface RelatorioDespesasMensais {
  totalDoMes: number;
  mes: string;
  despesasPorMembros: TotalPorMembroResponse[];
}
