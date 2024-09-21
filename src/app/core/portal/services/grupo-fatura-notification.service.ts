import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GrupoFaturaNotification {
  private notificarSeletorGrupoFatura = new BehaviorSubject<boolean>(false);
  private notificarGrupoIdMudou = new BehaviorSubject<boolean>(false);
  private notificarAnoMudou = new BehaviorSubject<boolean>(false);

  get recarregarComponentComNovoAno() {
    return this.notificarAnoMudou.asObservable();
  }

  get recarregarSeletorGrupoFaturaComAlteracoes(): Observable<boolean> {
    return this.notificarSeletorGrupoFatura.asObservable();
  }

  get recarregarPaginaComNovoGrupoId(): Observable<boolean> {
    return this.notificarGrupoIdMudou.asObservable();
  }

  notificarComponentesGrupoIdMudou(): void {
    this.notificarGrupoIdMudou.next(true);
  }

  notificarComponentesAnoMudou() {
    this.notificarAnoMudou.next(true);
  }

  notificarAlteracaoNoSeletorGrupoFatura() {
    this.notificarSeletorGrupoFatura.next(true);
  }
}
