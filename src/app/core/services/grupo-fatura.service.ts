import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { GrupoFatura } from '../interfaces/grupo-despesa.interface';
import { CrudService } from './base/crud.service';

@Injectable({ providedIn: 'root' })
export abstract class GrupoFaturaService extends CrudService<GrupoFatura> {
  constructor() {
    super(`${environment.base_url_financy}/grupo-fatura`);
  }
}
