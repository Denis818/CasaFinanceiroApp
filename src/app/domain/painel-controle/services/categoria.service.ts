import { Injectable } from '@angular/core';
import { CrudService } from 'src/app/core/services/base/crud.service';
import { environment } from 'src/app/environments/environment';
import { Categoria } from '../interfaces/categoria.interface';

@Injectable({ providedIn: 'root' })
export class CategoriaService extends CrudService<Categoria> {
  constructor() {
    super(`${environment.base_url_financy}/categoria`);
  }
}
