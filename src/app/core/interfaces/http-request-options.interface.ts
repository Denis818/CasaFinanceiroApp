import { HttpParams } from '@angular/common/http';
import { EnumTipoSpinner } from 'src/app/shared/enums/enum-tipo-spinner';

export interface HttpRequestOptions {
  metodo: string;
  url: string;
  dados?: any;
  params?: HttpParams;
  spinnerType?: EnumTipoSpinner;
}
