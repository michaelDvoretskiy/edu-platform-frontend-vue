import {BaseMethods} from "/src/services/api/BaseMethods.js";

export class TeamDataGetter {

  static #prefix = '/team-members'

  static getTeamMemberData(name) {
    return fetch(BaseMethods.getUrl(this.#prefix + '/' + name))
      .then(response => response.json()).then(data => data.data);
  }
}