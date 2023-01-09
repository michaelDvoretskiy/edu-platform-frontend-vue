import {BaseMethods} from "/src/services/api/BaseMethods.js";

export class Auth {

  static login(userData) {
    return fetch(BaseMethods.getUrl( '/login'), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData)
    }).then(response => response.json()).then(data => data.data);
  }

  static getVarificationCode(email, type) {
    return fetch(BaseMethods.getUrl( '/verif-code/' + type, {
      email: email
    })).then(response => response.json()).then(data => data.data);
  }

  static changePassword(userData) {
    return fetch(BaseMethods.getUrl( '/restore-pass'), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData)
    }).then(response => response.json()).then(data => data.data);
  }

  static logout() {
    localStorage.clear()
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