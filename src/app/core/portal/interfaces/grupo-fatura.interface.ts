import { StatusFatura } from './status-fatura.interface';

export interface GrupoFatura {
  code: string;
  nome: string;
  ano: string;
  quantidadeDespesas: number;
  totalDespesas: number;
  desconto: number;
  statusFaturas: StatusFatura[];
}
