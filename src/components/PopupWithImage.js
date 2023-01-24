import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._popupCardImg = document.querySelector('.popup__image');
    this._popupCardTitle = document.querySelector('.popup__img-description');
  }

  open(name, link) {
    this._popupCardTitle.textContent = name;
    this._popupCardImg.src = link;
    this._popupCardImg.alt = name;
    super.open()
  }
}
