export default class User {
    constructor({name, about, avatar, _id}, userNameSelector, userDescriptionSelector, userAvatarSelector) {
        this.name = name;
        this.about = about;
        this.avatar = avatar;
        this._id = _id;
        this._userNameElement = document.querySelector(userNameSelector);
        this._userDescriptionElement = document.querySelector(userDescriptionSelector);
        this._userAvatarElement = document.querySelector(userAvatarSelector);
    }

    getUserId() {
        return this._id;
    }

    setUserInfo() {
        this._userNameElement.textContent = this.name;
        this._userDescriptionElement.textContent = this.about;
        this._userAvatarElement.src = this.avatar;
    }


}