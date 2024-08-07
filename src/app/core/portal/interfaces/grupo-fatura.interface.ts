import { StatusFatura } from './status-fatura.interface';

export interface GrupoFatura {
  id: number;
  nome: string;
  ano: string;
  quantidadeDespesas: number;
  totalDespesas: number;
  statusFaturas: StatusFatura[];

  nomeEditavel: string;
  isEditing: boolean;
}
