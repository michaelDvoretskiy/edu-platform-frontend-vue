import {BaseMethods} from "/src/services/api/BaseMethods.js";
import {get, set} from "./IdbHelper";

export class PageDataGetter {

  static #prefix = '/pages'

  static getPageData(pageName) {
    return BaseMethods
      .getFromCacheOrFetch('info', 'page-' + pageName, BaseMethods.getUrl(this.#prefix + '/' + pageName))
      .then(res => res.data)
  }
}