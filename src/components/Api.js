export default class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _getResponce(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    const url = this._baseUrl + `/users/me`;
    return fetch(url, {
      headers: this._headers
    })
    .then(res => {
      return this._getResponce(res)
    });
  }

  getInitialCards() {
    const url = this._baseUrl + `/cards`;
    return fetch(url , {
    headers: this._headers
  })
    .then(res => {
      return this._getResponce(res);
    });
  }

  addCard(popupInputsValue) {
    const url = this._baseUrl + `/cards`;
    return fetch(url, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name:  popupInputsValue['caption-input'],
        link: popupInputsValue['link-input']
      })
    })
    .then(res => {
      return this._getResponce(res)
    });
  }

  deleteCard(id) {
    const url = this._baseUrl + `/cards/${id}`;
    return fetch(url, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(res => {
      return this._getResponce(res)
    });
  }

  putCardLike(id) {
    const url = this._baseUrl + `/cards/${id}/likes`;
    return fetch(url, {
      method: 'PUT',
      headers: this._headers
    })
    .then(res => {
      return this._getResponce(res)
    });
  }

  deleteCardLike(id) {
    const url = this._baseUrl + `/cards/${id}/likes`;
    return fetch(url, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(res => {
      return this._getResponce(res)
    });
  }

  editProfile(popupInputsValue) {
    const url = this._baseUrl + `/users/me`;
    return fetch(url, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: `${popupInputsValue.name}`,
        about: `${popupInputsValue.job}`
      })
    })
    .then(res => {
      return this._getResponce(res)
    });
  }

  updateAvatar(popupInputsValue) {
    const url = this._baseUrl + `/users/me/avatar`;
    return fetch(url, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: `${popupInputsValue.avatar}`
      })
    })
    .then(res => {
      return this._getResponce(res)
    });
  }


}
