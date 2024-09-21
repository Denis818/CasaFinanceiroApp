import { Injectable } from '@angular/core';
import { StorageService } from 'src/app/core/services/storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class FaturaCodeService {
  constructor(private readonly storageService: StorageService) {}

  hasFaturaCode(): boolean {
    return !!this.storageService.getItem('grupo-fatura-code');
  }
}
