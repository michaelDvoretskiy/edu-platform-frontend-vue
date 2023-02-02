import {BaseMethods} from "/src/services/api/BaseMethods.js";
import { set, get } from "/src/services/api/IdbHelper.js";

export class InfoGetter {

  static #prefix = '/info'

  static getInfo() {
    let options = {
      method: "GET",
    };
    let token = localStorage.getItem('token')
    if (token) {
      options['headers'] = { "Authorization": `Bearer ${token}` };
    }
    return BaseMethods
      .getFromCacheOrFetch('info', 'general', BaseMethods.getUrl(this.#prefix + '/get-general'), options)
      .then(res => res.data)
  }

  static getHomeCarousel() {
    return BaseMethods
      .getFromCacheOrFetch('info', 'home-carousel', BaseMethods.getUrl(this.#prefix + '/get-home-carousel'))
      .then(res => res.data)
  }

  static getFormText(name) {
    return BaseMethods
      .getFromCacheOrFetch('info', 'form-text-'+name, BaseMethods.getUrl(this.#prefix + '/get-form-text/' + name))
      .then(res => res.data)
  }

  static feedback(data) {
    return fetch(BaseMethods.getUrl( this.#prefix + '/feedback'), {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem('token')}` },
      body: JSON.stringify(data)
    }).then(response => response.json());
  }

  static getMyCourses() {
    let token = localStorage.getItem('token')
    let options = {
      method: "GET",
      headers: { "Authorization": `Bearer ${token}` }
    };

    return BaseMethods
      .getFromCacheOrFetch('info', 'my-courses', BaseMethods.getUrl(this.#prefix + '/my-courses'), options)
      .then(res => res.data)
  }

  static getMyPoints() {
    let token = localStorage.getItem('token')
    let options = {
      method: "GET",
      headers: { "Authorization": `Bearer ${token}` }
    };

    return BaseMethods
      .getFromCacheOrFetch('info', 'my-points', BaseMethods.getUrl(this.#prefix + '/my-points'), options)
      .then(res => res.data)
  }
}