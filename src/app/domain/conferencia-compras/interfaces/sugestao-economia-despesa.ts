import { Despesa } from '../../painel-controle/interfaces/despesa.interface';

export class SugestaoEconomiaDespesa {
  sugestaoDeFornecedor: string;
  itensDesteFornecedor: Despesa[] = [];
  expanded: boolean = false;
}
