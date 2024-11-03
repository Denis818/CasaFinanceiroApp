import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CrudService } from 'src/app/core/services/base/crud.service';
import { ApiResponse } from 'src/app/shared/interfaces/api/api-response';
import { environment } from 'src/environments/environment';
import { Cobranca } from '../interfaces/cobranca.interface';

@Injectable({ providedIn: 'root' })
export class CobrancaService extends CrudService<Cobranca> {
  constructor() {
    super(`${environment.base_url_financy_v2}/cobrancas`);
  }

  public getAllComprasDivididasPorDois(): Observable<Cobranca[]> {
    return this.sendHttpRequest<ApiResponse<Cobranca[]>>({
      metodo: 'GET',
      url: this.url + '/divididas-por-dois',
    }).pipe(map((response) => response.dados));
  }
}
