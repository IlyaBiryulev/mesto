import './index.css';

import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import Section from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";

import { initialCards,
  profilePopup,
  popupAddElement,
  popupImgElement,
  profileForm,
  formAddElement,
  profileEditButton,
  profileAddButton,
  cardsContainer,
  cadrsTemplate,
  config
} from "../utils/constants.js";

import { handleAddCardForm,
  handleProfileFormSubstitution,
  handleCardClick
 } from '../utils/utils.js';
//--------------------------------------------------------------------------------------------
const userInfo = new UserInfo(
  {
    profileNameSelector: '.profile__name',
    profileJobSelector: '.profile__about-me'
  }
)

const popupEditForm = new PopupWithForm({
  handleFormSubmit: (popupInputsValue) => {
    userInfo.setUserInfo(popupInputsValue.name, popupInputsValue.job);
    popupEditForm.close();
  }
}, profilePopup)
popupEditForm.setEventListeners()

profileEditButton.addEventListener('click', () => {
  const userData = userInfo.getUserInfo()
  handleProfileFormSubstitution(userData)
  profileFormValidator.resetValidation();
  popupEditForm.open()
});

const popupAddForm = new PopupWithForm({
  handleFormSubmit: (popupInputsValue) => {
    handleAddCardForm({
      name: popupInputsValue['caption-input'],
      link: popupInputsValue['link-input']
     });
     popupAddForm.close()
  }
}, popupAddElement)
popupAddForm.setEventListeners()

profileAddButton.addEventListener('click', () => {
  formAddValidator.resetValidation();
  popupAddForm.open()
});
//--------------------------------------------------------------------------------------------
//FUNC FOR OPENED IMG POPUP
export const popupOpenImg = new PopupWithImage(popupImgElement);
popupOpenImg.setEventListeners();

export const createCard = (item) => {
  const card = new Card(item, cadrsTemplate, handleCardClick)
  const cardElement = card.generateCard();
  return cardElement
}

const cardList = new Section({
  data: initialCards,
  renderer: (item) => {
    cardList.addItem(createCard(item))
  }
}, cardsContainer)

cardList.renderItems();

//--------------------------------------------------------------------------------------------

const beginValidation = (formSelector) => {
  const validator = new FormValidator(config, formSelector);
  return validator
}

const profileFormValidator = beginValidation(profileForm);
profileFormValidator.enableValidation(profileForm);

const formAddValidator = beginValidation(formAddElement);
formAddValidator.enableValidation(formAddElement)



