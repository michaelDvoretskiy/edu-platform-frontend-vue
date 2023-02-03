import {getLocale} from "/src/locales/index.js";
import {get, set, clearCache} from "./IdbHelper";

export class BaseMethods {
  static #baseApiUrl = import.meta.env.VITE_APP_API_URL; // process.env.VUE_APP_API_URL;
  static #authHeaderName = 'userauth';

  static getBaseApiUrl() {
    return this.#baseApiUrl;
  }

  static getAuthHeaderName() {
    return this.#authHeaderName;
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