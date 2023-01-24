export class Card {
  constructor(cardData, templateSelector, handleCardClick) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;

  }

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.photo-grid__item').cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this.element = this._getTemplate();

    this._title = this.element.querySelector('.photo-grid__title');
    this._likeButton = this.element.querySelector('.photo-grid__like');
    this._deleteButton = this.element.querySelector('.photo-grid__delete-btn');
    this._cardImg = this.element.querySelector('.photo-grid__image');

    this._title.textContent = this._name;
    this._cardImg.src = this._link;
    this._cardImg.alt = this._name;

    this._setEventListeners()

    return this.element;
  }

  _setEventListeners() {
    this._cardImg.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
    this._likeButton.addEventListener('click', (evt) => {
      this._handleCardLike(evt);
    });
    this._deleteButton.addEventListener('click', () => {
      this._handleCardDelete();
    });
  }

  _handleCardLike() {
    this._likeButton.classList.toggle('photo-grid__like_active');
  }

  _handleCardDelete() {
    this.element.remove()
  }
}
