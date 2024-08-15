import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MetricasNotification {
  private notificarMetricaMudou = new BehaviorSubject<boolean>(false);

  get recarregarCardTotaisComNovaMetrica() {
    return this.notificarMetricaMudou.asObservable();
  }

  notificarCardTotaisMetricaMudou() {
    console.log('Notifiqueiiiii')
    this.notificarMetricaMudou.next(true);
  }
}
