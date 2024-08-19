import { Component } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { SpinLoadService } from '../../services/spin-load.service';

@Component({
  selector: 'app-spin-load',
  templateUrl: './spin-load.component.html',
  styleUrl: './spin-load.component.css',
})
export class SpinLoadComponent {
  constructor(public spinLoadService: SpinLoadService) {}

  optionsLoadingSpinner: AnimationOptions = {
    path: '../../../../assets/spinners/loading-spinner.json',
  };

  optionsSavingSpinner: AnimationOptions = {
    path: '../../../../assets/spinners/saving-spinner.json',
  };
}
