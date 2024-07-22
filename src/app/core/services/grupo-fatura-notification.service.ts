import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class grupoFaturaNotification {
  private reloadSelectedgrupoFatura = new BehaviorSubject<boolean>(false);
  private notificarGrupoIdMudou = new BehaviorSubject<boolean>(false);

  private anoSelecionadoSource = new Subject<number>();
  anoSelecionado$ = this.anoSelecionadoSource.asObservable();

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

  atualizarAnoSelecionado(ano: number) {
    this.anoSelecionadoSource.next(ano);
  }
}
