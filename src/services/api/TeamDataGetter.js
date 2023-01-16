import {BaseMethods} from "/src/services/api/BaseMethods.js";

export class TeamDataGetter {

  static #prefix = '/team-members'

  static getTeamMemberData(name) {
    return BaseMethods
      .getFromCacheOrFetch('info', 'team-members-' + name, BaseMethods.getUrl(this.#prefix + '/' + name))
      .then(res => res.data)
  }
}