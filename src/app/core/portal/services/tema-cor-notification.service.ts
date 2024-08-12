import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TemaCorNotification {
  private notificarTemaMudou = new BehaviorSubject<boolean>(false);

  get recarregarComponentComNovoTema() {
    return this.notificarTemaMudou.asObservable();
  }

  notificarComponentesTemaMudou() {
    this.notificarTemaMudou.next(true);
  }
}
