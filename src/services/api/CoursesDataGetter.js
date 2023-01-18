import {BaseMethods} from "/src/services/api/BaseMethods.js";

export class CoursesDataGetter {

  static #prefix = '/courses'

  static getCategoriesList() {
    return BaseMethods
      .getFromCacheOrFetch('courses', 'categories', BaseMethods.getUrl(this.#prefix + '/categories'))
      .then(res => res.data)
  }

  static getCategory(name) {
    return BaseMethods
      .getFromCacheOrFetch('courses', 'category-' + name, BaseMethods.getUrl(this.#prefix + '/category/' + name))
      .then(res => res.data)
  }

  static getCourse(name) {
    let options = {
      method: "GET",
    };
    let token = localStorage.getItem('token')
    if (token) {
      options['headers'] = { "Authorization": `Bearer ${token}` };
    }

    return BaseMethods
      .getFromCacheOrFetch('courses', 'course-' + name, BaseMethods.getUrl(this.#prefix + '/course/' + name), options)
      .then(res => res.data)
  }

  static getLesson(name) {
    let options = {
      method: "GET",
    };
    let token = localStorage.getItem('token')
    if (token) {
      options['headers'] = { "Authorization": `Bearer ${token}` };
    }

    return BaseMethods
      .getFromCacheOrFetch('courses', 'lesson-' + name, BaseMethods.getUrl(this.#prefix + '/lesson/' + name), options)
      .then(res => res.data)
  }

  static getPdf(pdfId) {
    let options = {
      method: "GET",
    };
    let token = localStorage.getItem('token')
    if (token) {
      options['headers'] = { "Authorization": `Bearer ${token}` };
    }
    return BaseMethods
      .getFromCacheOrFetch('frames', pdfId, BaseMethods.getUrl(`/pdf/get-content/${pdfId}`), options)
  }
}