import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor( {handleFormSubmit}, popupSelector ){
    super(popupSelector);

    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popup.querySelector('.popup__form');
    this._popupInputs = this._popupForm.querySelectorAll('.popup__form-edit');
  }

  _getInputValues() {
    const popupInputsValue = {};

    this._popupInputs.forEach((input) => {
      const name = input.name
      const value = input.value

      popupInputsValue[name] = value

    });

    return popupInputsValue;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    })
  }

  close() {
    super.close();
    this._popupForm.reset();
  }
}

