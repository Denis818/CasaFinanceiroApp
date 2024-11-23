import { Component } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { SpinLoadService } from '../../../core/services/spinner/spin-load.service';
import { EnumTipoSpinner } from '../../enums/enum-tipo-spinner';

@Component({
  selector: 'app-spin-load',
  templateUrl: './spin-load.component.html',
  styleUrl: './spin-load.component.scss',
})
export class SpinLoadComponent {
  constructor(public spinLoadService: SpinLoadService) {}

  spinnerLoading = EnumTipoSpinner.loading;
  spinnerMoedaLoading = EnumTipoSpinner.moedaLoading;
  spinnerSaving = EnumTipoSpinner.saving;
  spinnerDownloading = EnumTipoSpinner.downloading;

  spinnerLoadingOptions: AnimationOptions = {
    path: `../../../../assets/spinners/${this.spinnerLoading}.json`,
  };

  spinnerMoedaLoadingOptions: AnimationOptions = {
    path: `../../../../assets/spinners/${this.spinnerMoedaLoading}.json`,
  };

  spinnerSavingOptions: AnimationOptions = {
    path: `../../../../assets/spinners/${this.spinnerSaving}.json`,
  };

  spinnerDownloadingOptions: AnimationOptions = {
    path: `../../../../assets/spinners/${this.spinnerDownloading}.json`,
  };
}
