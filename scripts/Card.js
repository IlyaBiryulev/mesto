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

    const cardTitle = this.element.querySelector('.photo-grid__title');
    const cardImg = this.element.querySelector('.photo-grid__image');

    const cardsLikeButton = this.element.querySelector('.photo-grid__like');
    const cardsDeleteButton = this.element.querySelector('.photo-grid__delete-btn');

    cardTitle.textContent = this._name;
    cardImg.src = this._link;
    cardImg.alt = this._name;

    this._setEventListeners(cardImg, cardsLikeButton, cardsDeleteButton)

    return this.element;
  }

  _setEventListeners(cardImg, cardsLikeButton, cardsDeleteButton) {
    cardImg.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
    cardsLikeButton.addEventListener('click', (evt) => {
      this._handleCardLike(evt);
    });
    cardsDeleteButton.addEventListener('click', () => {
      this._handleCardDelete();
    });
  }

  _handleCardLike(evt) {
    evt.target.classList.toggle('photo-grid__like_active');
  }

  _handleCardDelete() {
    this.element.remove()
  }
}
