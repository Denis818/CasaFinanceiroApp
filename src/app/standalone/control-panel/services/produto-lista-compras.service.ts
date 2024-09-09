import { Injectable } from "@angular/core";
import { CrudService } from "src/app/core/services/base/crud.service";
import { environment } from "src/environments/environment";
import { ProdutoListaCompras } from "../interfaces/produto-lista-compras.interface";

@Injectable({ providedIn: 'root' })
export class ProdutoListaComprasService extends CrudService<ProdutoListaCompras> {
  constructor() {
    super(`${environment.base_url_financy}/lista-compras`);
  }
}
