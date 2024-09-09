import { Injectable } from '@angular/core';
import { CrudService } from 'src/app/core/services/base/crud.service';
import { environment } from 'src/environments/environment';
import { ProdutoListaCompras } from '../interfaces/produto-lista-compras.interface';

@Injectable({ providedIn: 'root' })
export class ProdutoListaComprasService extends CrudService<ProdutoListaCompras> {
  constructor() {
    super(`${environment.base_url_financy}/lista-compras`);
  }

  public exportarPdfListaCompras() {
    this.sendHttpRequestForDownload(this.url + '/pdf-lista-compras').subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'lista-de-compras.pdf';
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      },
    });
  }
}
