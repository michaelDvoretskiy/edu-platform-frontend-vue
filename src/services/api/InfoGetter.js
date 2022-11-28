import {BaseMethods} from "/src/services/api/BaseMethods.js";

export class InfoGetter {

  static #prefix = '/info'

  static getInfo() {
    return fetch(BaseMethods.getUrl(this.#prefix + '/get-general'))
      .then(response => response.json()).then(data => data.data);
  }
}