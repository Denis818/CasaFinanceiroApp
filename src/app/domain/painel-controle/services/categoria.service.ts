import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/core/services/base/base.service';
import { environment } from 'src/app/environments/environment';
import { Categoria } from './../interfaces/categoria.interface';
import { CrudService } from 'src/app/core/services/base/crud.service';

@Injectable({ providedIn: 'root' })
export class CategoriaService extends CrudService<Categoria> {
  constructor() {
    super(`${environment.base_url_financy}/categoria`);
  }
}
