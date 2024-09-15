import { GrupoFatura } from 'src/app/core/portal/interfaces/grupo-fatura.interface';
import { Categoria } from './categoria.interface';

export interface Despesa {
  code: string;
  dataCompra: Date;
  item: string;
  preco: number;
  quantidade: number;
  fornecedor: string;
  total: number;
  categoria: Categoria;
  grupoFatura: GrupoFatura;
  categoriaCode: string;
  grupoFaturaCode: string;
}
