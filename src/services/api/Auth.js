import {BaseMethods} from "/src/services/api/BaseMethods.js";
import {getLocale} from "../../locales";

export class Auth {

  static login(userData) {
    BaseMethods.cacheClear()
    return fetch(BaseMethods.getUrl( '/login'), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData)
    }).then(response => response.json());
  }

  static getVarificationCode(email, type) {
    return fetch(BaseMethods.getUrl( '/verif-code/' + type, {
      email: email
    })).then(response => response.json());
  }

  static changePassword(userData) {
    return fetch(BaseMethods.getUrl( '/restore-pass'), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData)
    }).then(response => response.json());
  }

  static register(userData) {
    return fetch(BaseMethods.getUrl( '/register'), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData)
    }).then(response => response.json());
  }

  static logout(router) {
    BaseMethods.cacheClear()
    let token = localStorage.getItem('token')
    Auth.updateCacheClearDate(token).then(res => {
      localStorage.clear()
      let href = router.resolve({ name: 'Home', params: {locale: getLocale()}}).href
      window.location.href = href
    })
  }

  static updateCacheClearDate(token) {
    return fetch(BaseMethods.getUrl( '/user-cache/update'), {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
      body: JSON.stringify({})
    }).then(response => response.json())
  }

  static checkCacheClearNeed(token) {
    return fetch(BaseMethods.getUrl( '/user-cache/check'), {
      method: "GET",
      headers: { "Authorization": `Bearer ${token}` }
    }).then(response => response.json())
  }

  static storeUser(userData) {
    localStorage.clear()
    localStorage.setItem('username', userData.name)
    localStorage.setItem('token', userData.token)
    localStorage.setItem('email', userData.email)
  }

  static isUserLoggedIn() {
    return localStorage.getItem('username') != undefined;
  }

  static getUserName() {
    return localStorage.getItem('username')
  }
}