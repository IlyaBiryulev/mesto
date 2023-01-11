//ARRAY FOR PHOTO-GRID
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
//--------------------------------------------------------------------------------------------
//POPUP OPEN/CLOSE
const profilePopup = document.querySelector('.profile-popup');
const popupAddElement = document.querySelector('.popup_add-cards');
const popupImgElement = document.querySelector('.popup_open-img');
const closeButtons = document.querySelectorAll('.popup__close-button');

//POPUP EDIT-FORM
const profileForm = profilePopup.querySelector('.popup__form');
const nameInput =  profileForm.querySelector('.popup__form-edit_substitution_name');
const jobInput = profileForm.querySelector('.popup__form-edit_substitution_about-me');

//POPUP ADD-FORM
const formAddElement = popupAddElement.querySelector('.popup__form_add');
const formInputName = popupAddElement.querySelector('.popup__form-edit_name');
const formInputLink = popupAddElement.querySelector('.popup__form-edit_link');

//PROFILE ELEMENTS
const profileSection = document.querySelector('.profile');
const profileName = profileSection.querySelector('.profile__name');
const profileJob = profileSection.querySelector('.profile__about-me');

//BUTTONS EDIT AND ADD
const profileEditButton = profileSection.querySelector('.profile__edit-button');
const profileAddButton = profileSection.querySelector('.profile__add-button');

//TEMPLATE
const cardsContainer = document.querySelector('.photo-grid');
const cadrsTemplate = '.cards-template';

//POPUP IMG
const popupCardImg = popupImgElement.querySelector('.popup__image');
const popupCardTitle = popupImgElement.querySelector('.popup__img-description');
//--------------------------------------------------------------------------------------------

const escKeyCode = 'Escape';

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-edit',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__form_input_type_error',
  errorClass: 'popup__form-error_active'
};
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
    const openModal = document.querySelector('.popup_opened');
    closePopup(openModal)
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
const openImgPopup = (cardTitle) => {
  popupCardTitle.textContent = cardTitle.textContent
  popupCardImg.src = document.querySelector('.photo-grid__image').src;
  popupCardImg.alt = cardTitle.textContent;
  openPopup(popupImgElement)
}

initialCards.forEach((item) => {
  const card = new Card(item, cadrsTemplate, openImgPopup)
  const cardElement = card.generateCard();
  cardsContainer.append(cardElement);
})

const renderCard = (item) => {
  const card = new Card(item, cadrsTemplate, openImgPopup)
  const cardElement = card.generateCard();
  cardsContainer.append(cardElement);
}
//--------------------------------------------------------------------------------------------
//FUNC CLOSE POPUP
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeModalOnEsc)
}

const beginValidation = (formSelector) => {
  const form = new FormValidator(config, formSelector);
  form.enableValidation(formSelector);
}

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
  const form = new FormValidator(config, profileForm);
  form.resetValidation(profileForm);
  openPopup(profilePopup);
});

profileAddButton.addEventListener('click', () => {
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

beginValidation(profileForm);
beginValidation(formAddElement);

