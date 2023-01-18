import {getLocale} from "/src/locales/index.js";
import {get, set, clearCache} from "./IdbHelper";

export class BaseMethods {
  static #baseApiUrl = 'http://127.0.0.1:8000/api';

  static getBaseApiUrl() {
    return this.#baseApiUrl;
  }

  static getUrl(url, getParams = {}) {
    getParams['locale'] = getLocale();
    const params = new URLSearchParams(getParams).toString();
    return  this.#baseApiUrl  + url + '?' + params; //'?locale=' + getLocale();
  }

  static cacheClear(caches = null) {
    clearCache(caches)
  }

  static getFromCacheOrFetch(storeName, key, url, options = null) {
    const info = get(storeName, key)
    return info.then(data => {
      if (data == undefined) {
        return fetch(url, options)
          .then(response => response.json())
          .then(data => {
            if (data.success) {
                set(storeName, key, data)
            }
            return data
          });
      } else {
        return data;
      }
    })
  }
}