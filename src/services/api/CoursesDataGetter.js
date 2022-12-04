import {BaseMethods} from "/src/services/api/BaseMethods.js";

export class CoursesDataGetter {

  static #prefix = '/courses'

  static getCategoriesList() {
    return fetch(BaseMethods.getUrl(this.#prefix + '/categories'))
      .then(response => response.json()).then(data => data.data);
  }
}