//ARRAY FOR PHOTO-GRID
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
const cadrsTemplate = document.querySelector('.cards-template').content.querySelector('.photo-grid__item');

//POPUP IMG
const popupCardImg = popupImgElement.querySelector('.popup__image');
const popupCardTitle = popupImgElement.querySelector('.popup__img-description');
//--------------------------------------------------------------------------------------------

const escKeyCode = 'Escape';

import { enableValidation } from "./validate.js";
import { config } from "./validate.js";

//FUNC FOR ADD CARDS
const createCard = cardData => {
  const card = cadrsTemplate.cloneNode(true);

  const cardTitle = card.querySelector('.photo-grid__title');
  const cardImg = card.querySelector('.photo-grid__image');

  const cardsLikeButton = card.querySelector('.photo-grid__like');
  const cardsDeleteButton = card.querySelector('.photo-grid__delete-btn');

  cardImg.addEventListener('click', openImgPopup);
  cardsLikeButton.addEventListener('click', handleCardLike);
  cardsDeleteButton.addEventListener('click', handleCardDelete);

  cardTitle.textContent = cardData.name;
  cardImg.src = cardData.link;
  cardImg.alt = cardData.name;

  return card;
}
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
/*const openPopup = () => {
  popupElement.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}
//OPEN POPUP-ADD
const openAddPopup = () => {
  popupAddElement.classList.add('popup_opened');
}
//OPEN POPUP-IMG
const openImgPopup = () => {
  popupImgElement.classList.add('popup_opened');
}*/
//--------------------------------------------------------------------------------------------
//FUNC FOR OPENED IMG POPUP
const openImgPopup = (evt) => {
  popupCardTitle.textContent = evt.target.closest('.photo-grid__item').textContent
  popupCardImg.src = evt.currentTarget.src;
  popupCardImg.alt = evt.currentTarget.alt;
  openPopup(popupImgElement)
}

//FUNC FOR LIKE
const handleCardLike = e => {
  e.target.classList.toggle('photo-grid__like_active')
}

//FUNC FOR DELETE CARD
const handleCardDelete = e => {
  e.target.closest('.photo-grid__item').remove()
}
//--------------------------------------------------------------------------------------------
const renderCard = (cardData, wrapElement) => {
  const element = createCard(cardData);
  wrapElement.prepend(element);
}

initialCards.forEach(function(item) {
  renderCard(item, cardsContainer)
  /*const element = createElement(item);
  initialCardsEl.append(element);*/
})
//--------------------------------------------------------------------------------------------
//FUNC CLOSE POPUP
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeModalOnEsc)
  /*popupElement.classList.remove('popup_opened');
  popupAddElement.classList.remove('popup_opened');
  popupImgElement.classList.remove('popup_opened');*/
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

  renderCard(cardData, cardsContainer);

  closePopup(popupAddElement)
  evt.target.reset()
}
//--------------------------------------------------------------------------------------------
//CLICK OPEN
profileEditButton.addEventListener('click', () => {
  fillProfileFormInputs();
  enableValidation(config)
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

/*closeButtons.forEach(function(element) {
  element.addEventListener('click', () => closePopup(popupElement));
  element.addEventListener('click', () => closePopup(popupAddElement));
  element.addEventListener('click', () => closePopup(popupImgElement));
});*/

//closeButton.addEventListener('click', closePopup);
//--------------------------------------------------------------------------------------------
profileForm.addEventListener('submit', handleProfileFormSubmit);
formAddElement.addEventListener('submit', handleAddFormSubmit);

