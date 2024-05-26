import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { GrupoDespesa } from '../interfaces/grupo-despesa.interface';
import { CrudService } from './base/crud.service';

@Injectable({ providedIn: 'root' })
export abstract class GrupoDespesaService extends CrudService<GrupoDespesa> {
  constructor() {
    super(`${environment.base_url_financy}/grupo-despesa`);
  }
}
