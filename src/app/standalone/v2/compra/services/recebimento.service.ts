import { Injectable } from '@angular/core';
import { CrudService } from 'src/app/core/services/base/crud.service';
import { environment } from 'src/environments/environment';
import { Recebimento } from '../interfaces/recebimento.interface';

@Injectable({ providedIn: 'root' })
export class RecebimentoService extends CrudService<Recebimento> {
  constructor() {
    super(`${environment.base_url_financy_v2}/compras/recebimentos`);
  }
}
