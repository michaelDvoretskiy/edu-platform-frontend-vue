import {BaseMethods} from "/src/services/api/BaseMethods.js";

export class CoursesDataGetter {

  static #prefix = '/courses'

  static getCategoriesList() {
    return fetch(BaseMethods.getUrl(this.#prefix + '/categories'))
      .then(response => response.json()).then(data => data.data);
  }

  static getCategory(name) {
    return fetch(BaseMethods.getUrl(this.#prefix + '/category/' + name))
      .then(response => response.json()).then(data => data.data);
  }

  static getCourse(name) {
    let options = {
      method: "GET",
    };
    let token = localStorage.getItem('token')
    if (token) {
      options['headers'] = { "Authorization": `Bearer ${token}` };
    }

    return fetch(BaseMethods.getUrl(this.#prefix + '/course/' + name), options)
      .then(response => response.json()).then(data => data.data);
  }

  static getLesson(name) {
    return fetch(BaseMethods.getUrl(this.#prefix + '/lesson/' + name))
      .then(response => response.json()).then(data => data.data);
  }
}