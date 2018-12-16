import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private _apiURL: string = environment.apiURL;

  constructor() { }

  get apiURL(): string {
    return this._apiURL;
  }

}
