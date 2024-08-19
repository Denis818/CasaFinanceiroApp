import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  spinnerShow: boolean = true;
  requestCount: number = 0;

  constructor(private spinner: NgxSpinnerService) {}

  showSpinner(req: HttpRequest<any>): void {
    this.requestCount++;

    if (req.method === 'GET') {
      if (this.spinnerShow) {
        this.spinnerShow = false;
        this.spinner.show('loadingSpinner');
      }
    } else if (['POST', 'PUT', 'DELETE'].includes(req.method)) {
      if (this.spinnerShow) {
        this.spinnerShow = false;
        this.spinner.show('savingSpinner');
      }
    }
  }

  hideSpinner() {
    this.requestCount--;
    if (this.requestCount === 0) {
      this.spinnerShow = true;
      this.spinner.hide('loadingSpinner');
      this.spinner.hide('savingSpinner');
    }
  }
}
