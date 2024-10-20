import { Injectable } from '@angular/core';
import { CrudService } from 'src/app/core/services/base/crud.service';
import { environment } from 'src/environments/environment';
import { Compra } from '../interfaces/compra.interface';
import { Observable, map } from 'rxjs';
import { ApiResponse } from 'src/app/shared/interfaces/api/api-response';

@Injectable({ providedIn: 'root' })
export class CompraService extends CrudService<Compra> {
  constructor() {
    super(`${environment.base_url_financy_v2}/compras`);
  }

  public getAllComprasDivididasPorDois(): Observable<Compra[]> {
    return this.sendHttpRequest<ApiResponse<Compra[]>>({
      metodo: 'GET',
      url: this.url + '/divididas-por-dois',
    }).pipe(map((response) => response.dados));
  }
}
