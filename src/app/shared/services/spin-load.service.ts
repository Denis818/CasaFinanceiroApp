import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SpinLoadService {
  spinnerName: string = 'default';
  enableSpinLoad: boolean = false;
  spinnerIsActived = true;

  type: string = '';

  requestCount: number = 0;

  showSpinner(method: string): void {
    this.requestCount++;

    if (method === 'GET') {
      if (this.spinnerIsActived) {
        this.showSpinnerLoading();
      }
    } else if (['POST', 'PUT', 'DELETE'].includes(method)) {
      if (this.spinnerIsActived) {
        this.showSpinnerSaving();
      }
    }
  }

  showSpinnerSaving() {
    this.spinnerName = 'saving-spinner';
    this.enableSpinLoad = true;
    this.spinnerIsActived = false;
  }

  showSpinnerLoading() {
    this.spinnerName = 'loading-spinner';
    this.enableSpinLoad = true;
    this.spinnerIsActived = false;
  }

  hideSpinner() {
    this.requestCount--;
    if (this.requestCount === 0) {
      this.enableSpinLoad = false;
      this.spinnerIsActived = true;
    }
  }
}
