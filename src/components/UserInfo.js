export default class UserInfo {
  constructor(
    { profileNameSelector, profileAboutSelector, profileAvatarSelector },
    userId
  ) {
    this._name = document.querySelector(profileNameSelector);
    this._about = document.querySelector(profileAboutSelector);
    this._avatar = document.querySelector(profileAvatarSelector);
    this._userId = userId;
  }

  getUserInfo() {
    const userInfo = {
      name: this._name.textContent,
      about: this._about.textContent,
    };

    return userInfo;
  }

  setUserInfo({ name, about, avatar }) {
    this._name.textContent = name;
    this._about.textContent = about;
    this._avatar.src = avatar;
  }
}
