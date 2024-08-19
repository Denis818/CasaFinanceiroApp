import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  requestCount: number = 0;
  isLoading: boolean = false;
  isSaving: boolean = false;

  showSpinner(method: string): void {
    this.requestCount++;

    if (method === 'GET') {
      this.isLoading = true;
    } else if (['POST', 'PUT', 'DELETE'].includes(method)) {
      this.isSaving = true;
    }
  }

  hideSpinner() {
    this.requestCount--;
    if (this.requestCount === 0) {
      this.isLoading = false;
      this.isSaving = false;
    }
  }
}
