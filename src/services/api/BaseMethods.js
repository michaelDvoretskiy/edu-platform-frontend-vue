import {getLocale} from "/src/locales/index.js";

export class BaseMethods {
  static #baseApiUrl = 'http://127.0.0.1:8000/api';

  static getUrl(url, getParams = {}) {
    getParams['locale'] = getLocale();
    const params = new URLSearchParams(getParams).toString();
    return  this.#baseApiUrl  + url + '?' + params; //'?locale=' + getLocale();
  }
}