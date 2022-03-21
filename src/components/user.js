export default class User {
    constructor({name, about, avatar, _id}, userNameSelector, userDescriptionSelector, userAvatarSelector) {
        this.name = name;
        this.about = about;
        this.avatar = avatar;
        this._id = _id;
        this.userNameElement = document.querySelector(userNameSelector);
        this.userDescriptionElement = document.querySelector(userDescriptionSelector);
        this._userAvatarElement = document.querySelector(userAvatarSelector);
    }

    getUserId() {
        return this._id;
    }

    setUserInfo() {
        this.userNameElement.textContent = this.name;
        this.userDescriptionElement.textContent = this.about;
        this._userAvatarElement.src = this.avatar;
    }
// Продумать поведение функции setInfo на случай вызова из кнопок редактирования пользователей и аватара

}