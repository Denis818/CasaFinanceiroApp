import { StatusFatura } from './status-fatura.interface';

export interface GrupoFatura {
  id: number;
  nome: string;
  statusFaturas: StatusFatura[];

  nomeEditavel: string;
  isEditing: boolean;
}
