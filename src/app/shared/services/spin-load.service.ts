import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SpinLoadService {
  spinnerName: string = 'default';
  enableSpinLoad: boolean = false;

  type: string = '';

  requestCount: number = 0;

  showSpinner(method: string): void {
    this.requestCount++;

    if (method === 'GET') {
      if (true) {
        this.showSpinnerLoading();
      }
    } else if (['POST', 'PUT', 'DELETE'].includes(method)) {
      if (true) {
        this.showSpinnerSaving();
      }
    }
  }

  showSpinnerSaving() {
    this.spinnerName = 'saving-spinner';
    this.enableSpinLoad = true;
  }

  showSpinnerLoading() {
    this.spinnerName = 'loading-spinner';
    this.enableSpinLoad = true;
  }

  hideSpinner() {
    this.requestCount--;
    if (this.requestCount === 0) {
      this.enableSpinLoad = false;
    }
  }
}
