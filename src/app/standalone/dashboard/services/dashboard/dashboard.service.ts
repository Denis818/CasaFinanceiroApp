import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BaseService } from 'src/app/core/services/base/base.service';
import { ApiResponse } from 'src/app/shared/interfaces/api/api-response';
import { environment } from 'src/environments/environment';
import { DashboardData } from '../../interfaces/dashboard-response.interface';

@Injectable({ providedIn: 'root' })
export class DashboardService extends BaseService {
  url: string = `${environment.base_url_financy}/despesa`;
  private graficoCor: string = '#6b18ffd4';

  constructor() {
    super();
  }

  public getDashboardData(ano: string): Observable<DashboardData> {
    const params = new HttpParams().set('ano', ano);

    return this.sendHttpRequest<ApiResponse<DashboardData>>({
      metodo: 'GET',
      url: `${this.url}/dashboard-data`,
      params: params,
    }).pipe(map((response) => response.dados));
  }

  public exportarRelatorioDespesasHabitacional() {
    this.sendHttpRequestForDownload(
      this.url + '/pdf-despesas-moradia'
    ).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'relatorio-despesas-habitacional.pdf';
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      },
    });
  }

  public exportarRelatorioDespesasCasa() {
    this.sendHttpRequestForDownload(this.url + '/pdf-despesas-casa').subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'relatorio-despesas-casa.pdf';
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      },
    });
  }
}
