import {BaseMethods} from "/src/services/api/BaseMethods.js";

export class PageDataGetter {

  static #prefix = '/pages'

  static getPageData(pageName) {
    return fetch(BaseMethods.getUrl(this.#prefix + '/' + pageName))
      .then(response => response.json()).then(data => data.data);
  }
}