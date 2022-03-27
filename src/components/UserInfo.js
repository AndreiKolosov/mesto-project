export default class UserInfo {
  constructor(
    { name, about, avatar, _id },
    userNameSelector,
    userDescriptionSelector,
    userAvatarSelector
  ) {
    this.name = name;
    this.about = about;
    this.avatar = avatar;
    this._id = _id;
    this.userNameElement = document.querySelector(userNameSelector);
    this.userDescriptionElement = document.querySelector(userDescriptionSelector);
    this.userAvatarElement = document.querySelector(userAvatarSelector);
  }

  getUserInfo() {
    return {
      userName: this.userNameElement.textContent,
      userDescription: this.userDescriptionElement.textContent,
      userAvatar: this.userAvatarElement.textContent,
    };
  }

  setUserInfo() {
    this.userNameElement.textContent = this.name;
    this.userDescriptionElement.textContent = this.about;
  }

  setUserAvatar = () => {
    this.userAvatarElement.src = this.avatar;
  };
}
