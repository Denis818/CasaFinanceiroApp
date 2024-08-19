import { ApplicationConfig } from '@angular/core';
import player from 'lottie-web';
import { provideLottieOptions } from 'ngx-lottie';

export const appConfig: ApplicationConfig = {
  providers: [
    provideLottieOptions({
      player: () => player,
    }),
  ],
};
