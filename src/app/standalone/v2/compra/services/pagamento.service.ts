import { Injectable } from '@angular/core';
import { CrudService } from 'src/app/core/services/base/crud.service';
import { environment } from 'src/environments/environment';
import { Pagamento } from '../interfaces/pagamento.interface';

@Injectable({ providedIn: 'root' })
export class PagamentoService extends CrudService<Pagamento> {
  constructor() {
    super(`${environment.base_url_financy_v2}/cobrancas/pagamento`);
  }
}
