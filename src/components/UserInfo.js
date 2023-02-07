export class UserInfo {
  constructor({profileNameSelector, profileJobSelector, profileAvatarSelector}) {
    this._name = document.querySelector(profileNameSelector);
    this._job = document.querySelector(profileJobSelector);
    this._avatar = document.querySelector(profileAvatarSelector)
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      job: this._job.textContent
    }
  }

  getUserAvatar() {
    return {
      avatar: this._avatar.src
    }
  }

  setUserAvatar(avatar) {
    this._avatar.src = avatar;
  }

  setUserInfo(name, job, userId) {
    this._name.textContent = name;
    this._job.textContent = job;
    if(userId) {
      this._userId = userId;
    }
  }

  getUserId() {
    return this._userId
  }
}
