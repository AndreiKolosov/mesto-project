export default class UserInfo {
  constructor(
    userNameSelector,
    userDescriptionSelector,
    userAvatarSelector
  ) {
    this.userNameElement = document.querySelector(userNameSelector);
    this.userDescriptionElement = document.querySelector(userDescriptionSelector);
    this.userAvatarElement = document.querySelector(userAvatarSelector);
    this.id = null;
  }

  getUserInfo() {
    return {
      name: this.userNameElement.textContent,
      about: this.userDescriptionElement.textContent,
      avatar: this.userAvatarElement.textContent,
    };
  }

  setUserInfo({name, about, avatar, _id}) {
    this.userNameElement.textContent = name;
    this.userDescriptionElement.textContent = about;
    this.userAvatarElement.src = avatar;
    this.id = _id;
  }
}
