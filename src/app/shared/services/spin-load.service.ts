import { Injectable } from '@angular/core';
import { EnumTipoSpinner } from '../enums/enum-tipo-spinner';

@Injectable({
  providedIn: 'root',
})
export class SpinLoadService {
  tipoSpinner: EnumTipoSpinner;
  enableSpinLoad: boolean = false;

  spinnerIsActived = true;
  requestCount: number = 0;

  showSpinner(method: string): void {
    this.requestCount++;

    if (method === 'GET') {
      if (this.spinnerIsActived) {
        this.runSpinner(EnumTipoSpinner.Loading);
      }
    } else if (['POST', 'PUT', 'DELETE'].includes(method)) {
      if (this.spinnerIsActived) {
        this.runSpinner(EnumTipoSpinner.Saving);
      }
    }
  }

  runSpinner(spinner: EnumTipoSpinner) {
    this.enableSpinLoad = true;
    this.spinnerIsActived = false;

    switch (spinner) {
      case EnumTipoSpinner.Loading:
        this.tipoSpinner = EnumTipoSpinner.Loading;
        break;
      case EnumTipoSpinner.Saving:
        this.tipoSpinner = EnumTipoSpinner.Saving;
        break;
    }
  }

  hideSpinner() {
    this.requestCount--;
    if (this.requestCount === 0) {
      this.enableSpinLoad = false;
      this.spinnerIsActived = true;
    }
  }
}
