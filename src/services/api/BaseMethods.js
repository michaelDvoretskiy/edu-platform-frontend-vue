import {getLocale} from "/src/locales/index.js";

export class BaseMethods {
  static #baseApiUrl = 'http://127.0.0.1:8000/api';

  static getUrl(url) {
    return  this.#baseApiUrl  + url + '?locale=' + getLocale();
  }
}