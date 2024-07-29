import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CrudService } from 'src/app/core/services/base/crud.service';
import { environment } from 'src/environments/environment';
import { Membro } from '../interfaces/membro.interface';

@Injectable({ providedIn: 'root' })
export class MembroService extends CrudService<Membro> {
  constructor() {
    super(`${environment.base_url_financy}/membro`);
  }

  public enviarMensagemWhatsApp(
    nome: string,
    pix: string,
    isMoradia: boolean,
    titleMessage: string
  ): Observable<string> {
    const params = new HttpParams()
      .set('nome', nome)
      .set('pix', pix)
      .set('isMoradia', isMoradia.toString())
      .set('titleMessage', titleMessage);

    return this.sendHttpRequest(
      'GET',
      `${this.url}/enviar-mensagem`,
      null,
      params
    ).pipe(map((response: any) => response.dados.redirectToWhatsApp));
  }
}
