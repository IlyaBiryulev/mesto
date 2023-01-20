//ARRAY FOR PHOTO-GRID
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import Section from "../components/Section.js";

import { initialCards,
  profilePopup,
  popupAddElement,
  popupImgElement,
  closeButtons,
  profileForm,
  nameInput,
  jobInput,
  formAddElement,
  formInputName,
  formInputLink,
  profileSection,
  profileName,
  profileJob,
  profileEditButton,
  profileAddButton,
  cardsContainer,
  cadrsTemplate,
  popupCardImg,
  popupCardTitle,
  escKeyCode,
  config } from "../utils/constants.js";

//--------------------------------------------------------------------------------------------
//FUNC FOR CLOSE POPUP ON ESC
const closeModalOnEsc = (evt) => {
  if(evt.key === escKeyCode) {
    const openModal = document.querySelector('.popup_opened');
    closePopup(openModal)
  }
}
//FUNC FOR CLOSE POPUP ON OVERLAY
const closeModalOnOverlay = (evt) => {
  if(evt.target === evt.currentTarget) {
    closePopup(evt.target)
  }
}

//--------------------------------------------------------------------------------------------
//OPEN POPUP-EDIT
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeModalOnEsc)
}

const fillProfileFormInputs = () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}
//--------------------------------------------------------------------------------------------
//FUNC FOR OPENED IMG POPUP
const openImgPopup = (name, link) => {
  popupCardTitle.textContent = name;
  popupCardImg.src = link;
  popupCardImg.alt = name;
  openPopup(popupImgElement)
}

function createCard(item) {
  const card = new Card(item, cadrsTemplate, openImgPopup)
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
//FUNC CLOSE POPUP
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeModalOnEsc)
}

const beginValidation = (formSelector) => {
  const validator = new FormValidator(config, formSelector);
  return validator
}

const profileFormValidator = beginValidation(profileForm);
profileFormValidator.enableValidation(profileForm);

const formAddValidator = beginValidation(formAddElement);
formAddValidator.enableValidation(formAddElement)
//--------------------------------------------------------------------------------------------
//SUBMIT FOR EDIT
function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopup(profilePopup);
}

//SUBMIT FOR ADD
const handleAddFormSubmit = (evt) => {
  evt.preventDefault();
  const cardData = {
    name: formInputName.value,
    link: formInputLink.value
  }

  renderCard(cardData);

  closePopup(popupAddElement)
  evt.target.reset()
}
//--------------------------------------------------------------------------------------------
//CLICK OPEN
profileEditButton.addEventListener('click', () => {
  fillProfileFormInputs();
  profileFormValidator.resetValidation(profileForm);
  openPopup(profilePopup);
});

profileAddButton.addEventListener('click', () => {
  formAddValidator.resetValidation(formAddElement);
  openPopup(popupAddElement);
});
//CLICK CLOSE
closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});
//CLICK CLOSE POPUP ON OVERLAY
profilePopup.addEventListener('click', closeModalOnOverlay);
popupAddElement.addEventListener('click', closeModalOnOverlay);
popupImgElement.addEventListener('click', closeModalOnOverlay);
//--------------------------------------------------------------------------------------------
profileForm.addEventListener('submit', handleProfileFormSubmit);
formAddElement.addEventListener('submit', handleAddFormSubmit);


