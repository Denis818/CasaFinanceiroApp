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
          this.runSpinner(spinnerType);
        }
        break;
      case EnumTipoSpinner.saving:
        if (this.spinnerIsActived) {
          this.runSpinner(spinnerType);
        }
        break;
      case EnumTipoSpinner.downloading:
        if (this.spinnerIsActived) {
          this.runSpinner(spinnerType);
        }
        break;
    }
  }

  runSpinner(spinner: EnumTipoSpinner) {
    this.enableSpinLoad = true;
    this.spinnerIsActived = false;

    switch (spinner) {
      case EnumTipoSpinner.loading:
        this.tipoSpinner = EnumTipoSpinner.loading;
        break;
      case EnumTipoSpinner.saving:
        this.tipoSpinner = EnumTipoSpinner.saving;
        break;
      case EnumTipoSpinner.downloading:
        this.tipoSpinner = EnumTipoSpinner.downloading;
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