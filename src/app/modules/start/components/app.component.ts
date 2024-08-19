import { Component } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { SpinnerService } from 'src/app/core/services/spinner/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  loadingSpinnerOptions: AnimationOptions = {
    path: '/assets/spinners/loading-animation.json',
  };

  savingSpinnerOptions: AnimationOptions = {
    path: '/assets/spinners/saving-animation.json',
  };

  constructor(public spinnerService: SpinnerService) {}
}
