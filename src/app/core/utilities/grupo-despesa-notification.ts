import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GrupoDespesaNotification {
  private reloadSelectedGrupoDespesa = new BehaviorSubject<boolean>(false);
  private notificarGrupoIdMudou = new BehaviorSubject<boolean>(false);

  get realoadGrupoDespesas(): Observable<boolean> {
    return this.reloadSelectedGrupoDespesa.asObservable();
  }

  get recarregarPaginaComNovoGrupoId(): Observable<boolean> {
    return this.notificarGrupoIdMudou.asObservable();
  }

  notificarComponentesGrupoIdMudou(): void {
    this.notificarGrupoIdMudou.next(true);
  }

  recarregarListaGrupoDespesa() {
    this.reloadSelectedGrupoDespesa.next(true);
  }
}
