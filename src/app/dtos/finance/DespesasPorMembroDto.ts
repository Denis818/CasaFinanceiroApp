import { DespesaPorMembro } from './DespesaPorMembroDto';

export interface DespesasPorMembroDto {
  totalDoMes: number;
  mes: string;
  despesasPorMembros: DespesaPorMembro[];
}
