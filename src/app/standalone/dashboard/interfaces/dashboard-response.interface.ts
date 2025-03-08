import { Categoria } from '../../control-panel/interfaces/categoria.interface';
import { ResumoGrupoResponse } from './resumo-grupo-response.interface';
import { TotalPorGrupoResponse } from './total-por-grupo-response.interface';

export interface DashboardData {
  despesasDivididasMensal: ResumoGrupoResponse;
  despesaGrupoParaGrafico: TotalPorGrupoResponse[];
  categorias: Categoria[];
}
