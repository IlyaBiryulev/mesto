export class Card {
  constructor(cardData, templateSelector,  userId,  {handleCardClick, handleCardDelete, handleLikeClick}) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._likes = cardData.likes;

    this._id = cardData._id;
    this._userId = userId;

    this._ownerId = cardData.owner._id;

    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleLikeClick = handleLikeClick;
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
    this._cardLikeCounter = this.element.querySelector('.photo-grid__like-counter')

    this._title.textContent = this._name;
    this._cardImg.src = this._link;
    this._cardImg.alt = this._name;
    this._cardLikeCounter.textContent = this._likes.length;

    this._toggleCardLike()
    this._setEventListeners()

    return this.element;
  }

  _setEventListeners() {
    this._cardImg.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });

    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick(this._id)
    });

    if(this._userId !== this._ownerId) {
      this._deleteButton.remove();
    } else {
      this._deleteButton.addEventListener('click', () => {
        this._handleCardDelete(this._id);
      });
    }
  }

  putCardLikeButton() {
    this._likeButton.classList.add('photo-grid__like_active');
    this.isLiked = true;
  }

  dislikeCardLikeButton() {
    this._likeButton.classList.remove('photo-grid__like_active');
    this.isLiked = false;
  }

  _toggleCardLike() {
    if(this._likes.find((user) => user._id === this._userId)){
      this.putCardLikeButton()
    } else {
      this.dislikeCardLikeButton()
    }
  }

  handleCardLikeCounter(data) {
    this._cardLikeCounter.textContent = data.length;
  }

  deleteCard() {
    this.element.remove();
    this.element = null;
  }
}
