import { Injectable } from '@angular/core';
import { EnumTipoSpinner } from '../../../shared/enums/enum-tipo-spinner';

@Injectable({
  providedIn: 'root',
})
export class SpinLoadService {
  tipoSpinner: EnumTipoSpinner;
  enableSpinLoad: boolean = false;

  spinnerIsActived = true;
  requestCount: number = 0;

  showSpinner(spinnerType: EnumTipoSpinner): void {
    this.requestCount++;

    switch (spinnerType) {
      case EnumTipoSpinner.loading:
        if (this.spinnerIsActived) {
          this.runSpinner(EnumTipoSpinner.loading);
        }
        break;
      case EnumTipoSpinner.saving:
        if (this.spinnerIsActived) {
          this.runSpinner(EnumTipoSpinner.saving);
        }
        break;
      case EnumTipoSpinner.downloading:
        if (this.spinnerIsActived) {
          this.runSpinner(EnumTipoSpinner.downloading);
        }
        break;
    }
  }

  runSpinner(spinner: EnumTipoSpinner) {
    setTimeout(() => {
      this.enableSpinLoad = true;
      this.tipoSpinner = spinner;
      this.spinnerIsActived = false;
    });
  }

  hideSpinner() {
    this.requestCount--;
    if (this.requestCount === 0) {
      this.enableSpinLoad = false;
      this.spinnerIsActived = true;
    }
  }
}
