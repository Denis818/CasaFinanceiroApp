import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { BaseService } from 'src/app/core/services/base/base.service';
import { environment } from 'src/app/environments/enviroment';
import { ApiResponse } from 'src/app/shared/interfaces/api/api-response';
import { DespesasPorMesMembroResponse } from '../../interfaces/financy/despesas-por-mes-membro-response.interface';

@Injectable({ providedIn: 'root' })
export class FinancyService extends BaseService {
  public readonly router = inject(Router);

  public url: string = `${environment.base_url_financy}/api/Despesa`;

  public getTotalParaCadaMembro(): Observable<DespesasPorMesMembroResponse> {
    return this.sendHttpRequest<ApiResponse<DespesasPorMesMembroResponse>>(
      'GET',
      this.url + '/total-por-membro'
    ).pipe(map((response) => response.dados));
  }
}
