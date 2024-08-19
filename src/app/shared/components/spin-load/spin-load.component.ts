import { Component } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { EnumTipoSpinner } from '../../enums/enum-tipo-spinner';
import { SpinLoadService } from '../../services/spin-load.service';

@Component({
  selector: 'app-spin-load',
  templateUrl: './spin-load.component.html',
  styleUrl: './spin-load.component.css',
})
export class SpinLoadComponent {
  constructor(public spinLoadService: SpinLoadService) {}

  spinnerLoading = EnumTipoSpinner.Loading;
  spinnerSaving = EnumTipoSpinner.Saving;

  spinnerLoadingOptions: AnimationOptions = {
    path: `../../../../assets/spinners/${this.spinnerLoading}.json`,
  };

  spinnerSavingOptions: AnimationOptions = {
    path: `../../../../assets/spinners/${this.spinnerSaving}.json`,
  };
}
