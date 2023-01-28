export default class UserInfo {
  constructor({ profileNameSelector, profileAboutSelector }) {
    this._name = document.querySelector(profileNameSelector);
    this._about = document.querySelector(profileAboutSelector);
  }

  getUserInfo() {}

  setUserInfo() {}
}
