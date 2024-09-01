import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BaseService } from 'src/app/core/services/base/base.service';
import { ApiResponse } from 'src/app/shared/interfaces/api/api-response';
import { environment } from 'src/environments/environment';
import { ComparativoFaturas } from './../interfaces/comparativo-fatura.interface';

@Injectable({ providedIn: 'root' })
export class ComparativoFaturaService extends BaseService {
  public url: string = `${environment.base_url_financy}`;

  getComparativoFaturas(
    grupoFaturaCode1: string,
    grupoFaturaCode2: string
  ): Observable<ComparativoFaturas[]> {
    let params = new HttpParams()
      .set('grupoFaturaCode1', grupoFaturaCode1)
      .set('grupoFaturaCode2', grupoFaturaCode2);

    return this.sendHttpRequest<ApiResponse<ComparativoFaturas[]>>({
      metodo: 'GET',
      url: `${this.url}/despesa/comparativo-faturas`,
      params: params,
    }).pipe(map((response) => response.dados));
  }
}
