import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SpinLoadService {
  enableSpinLoad: boolean = false;

  constructor() {}
}
