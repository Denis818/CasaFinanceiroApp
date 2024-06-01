import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class grupoFaturaNotification {
  private reloadSelectedgrupoFatura = new BehaviorSubject<boolean>(false);
  private notificarGrupoIdMudou = new BehaviorSubject<boolean>(false);

  get realoadgrupoFaturas(): Observable<boolean> {
    return this.reloadSelectedgrupoFatura.asObservable();
  }

  get recarregarPaginaComNovoGrupoId(): Observable<boolean> {
    return this.notificarGrupoIdMudou.asObservable();
  }

  notificarComponentesGrupoIdMudou(): void {
    this.notificarGrupoIdMudou.next(true);
  }

  recarregarListagrupoFatura() {
    this.reloadSelectedgrupoFatura.next(true);
  }
}
