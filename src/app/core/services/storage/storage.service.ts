import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  storage: Storage;
  constructor() {
    this.storage = localStorage;
  }
  [name: string]: any;
  length: number;

  clear(): void {
    this.storage.clear();
  }

  getItem(key: string): string | null {
    return this.storage.getItem(key);
  }
  key(index: number): string | null {
    return this.storage.key(index);
  }
  removeItem(key: string): void {
    this.storage.removeItem(key);
  }
  setItem(key: string, value: string): void {
    this.storage.setItem(key, value);
  }

  cleanAndPreserverItem(preserveKeys: string[]): void {
    const itemsToPreserve: { [key: string]: string | null } = {};

    preserveKeys.forEach((key) => {
      const value = this.storage.getItem(key);
      if (value !== null) {
        itemsToPreserve[key] = value;
      }
    });

    this.storage.clear();

    Object.keys(itemsToPreserve).forEach((key) => {
      this.storage.setItem(key, itemsToPreserve[key]!);
    });
  }
}
