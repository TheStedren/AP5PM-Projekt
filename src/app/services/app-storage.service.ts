import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular'

@Injectable({
  providedIn: 'root'
})
export class AppStorageService {

  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }
  
  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async get(key: string) {  
    return await this._storage?.get(key);
  }
  
  async set(key: string, value: any) {  
    await this._storage?.set(key, value);
  }
}
