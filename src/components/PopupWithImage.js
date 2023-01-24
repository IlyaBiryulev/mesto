import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(name, link) {
    const popupCardImg = document.querySelector('.popup__image');
    const popupCardTitle = document.querySelector('.popup__img-description');
    popupCardTitle.textContent = name;
    popupCardImg.src = link;
    popupCardImg.alt = name;
    super.open()
  }
}
