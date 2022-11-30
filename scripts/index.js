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
const popupElement = document.querySelector('.profile-popup');
const popupAddElement = document.querySelector('.popup_add-cards');
const popupImgElement = document.querySelector('.popup_open-img');
const closeButtons = document.querySelectorAll('.popup__close-button');

//POPUP EDIT-FORM
const formElement = popupElement.querySelector('.popup__form');
const nameInput =  formElement.querySelector('.popup__form-edit_substitution_name');
const jobInput = formElement.querySelector('.popup__form-edit_substitution_about-me');

//POPUP ADD-FORM
const formAddElement = popupAddElement.querySelector('.popup__form_add');
const formInputName = popupAddElement.querySelector('.popup__form-edit_name');
const formInputLink = popupAddElement.querySelector('.popup__form-edit_link');

//PROFILE ELEMENTS
const profileElements = document.querySelector('.profile');
const profileName = profileElements.querySelector('.profile__name');
const profileJob = profileElements.querySelector('.profile__about-me');

//BUTTONS EDIT AND ADD
const profileEditButton = profileElements.querySelector('.profile__edit-button');
const profileAddButton = profileElements.querySelector('.profile__add-button');

//TEMPLATE
const initialCardsEl = document.querySelector('.photo-grid');
const cadrsTemplate = document.querySelector('.cards-template').content.querySelector('.photo-grid__item');

//POPUP IMG
const popupCardImg = popupImgElement.querySelector('.popup__image');
const popupCardTitle = popupImgElement.querySelector('.popup__img-description');
//--------------------------------------------------------------------------------------------
//FUNC FOR ADD CARDS
const createElement = item => {
  const card = cadrsTemplate.cloneNode(true);

  const cardTitle = card.querySelector('.photo-grid__title');
  const cardImg = card.querySelector('.photo-grid__image');

  const cardsLikeButton = card.querySelector('.photo-grid__like');
  const cardsDeleteButton = card.querySelector('.photo-grid__delete-btn');

  cardImg.addEventListener('click', openedImgPopup);
  cardsLikeButton.addEventListener('click', handlerLikeButtonClick);
  cardsDeleteButton.addEventListener('click', handlerDeleteButtonClick);

  cardTitle.textContent = item.name;
  cardImg.src = item.link;
  cardImg.alt = item.name;

  return card;
}

//--------------------------------------------------------------------------------------------
//OPEN POPUP-EDIT
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
}

const openedEditForm = () => {
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
const openedImgPopup = (evt) => {
  popupCardTitle.textContent = evt.target.closest('.photo-grid__item').textContent
  popupCardImg.src = evt.currentTarget.src;
  popupCardImg.alt = evt.currentTarget.alt;
  openPopup(popupImgElement)
}

//FUNC FOR LIKE
const handlerLikeButtonClick = e => {
  e.target.classList.toggle('photo-grid__like_active')
}

//FUNC FOR DELETE CARD
const handlerDeleteButtonClick = e => {
  e.target.closest('.photo-grid__item').remove()
}
//--------------------------------------------------------------------------------------------
const renderCards = (item, wrapElement) => {
  const element = createElement(item);
  wrapElement.prepend(element);
}

initialCards.forEach(function(item) {
  renderCards(item, initialCardsEl)
  /*const element = createElement(item);
  initialCardsEl.append(element);*/
})
//--------------------------------------------------------------------------------------------
//FUNC CLOSE POPUP
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
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

    closePopup(popupElement);
}

//SUBMIT FOR ADD
const handleAddFormSubmit = (evt) => {
  evt.preventDefault();
  evt.target.reset()
  const addForm = {
    name: formInputName.value,
    link: formInputLink.value
  }

  renderCards(addForm, initialCardsEl);

  closePopup(popupAddElement)
  evt.target.reset()
}
//--------------------------------------------------------------------------------------------
//CLICK OPEN
profileEditButton.addEventListener('click', () => {
  openPopup(popupElement);
  openedEditForm();
});
profileAddButton.addEventListener('click', () => openPopup(popupAddElement));
//CLICK CLOSE
closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});
/*closeButtons.forEach(function(element) {
  element.addEventListener('click', () => closePopup(popupElement));
  element.addEventListener('click', () => closePopup(popupAddElement));
  element.addEventListener('click', () => closePopup(popupImgElement));
});*/

//closeButton.addEventListener('click', closePopup);
//--------------------------------------------------------------------------------------------
formElement.addEventListener('submit', handleProfileFormSubmit);
formAddElement.addEventListener('submit', handleAddFormSubmit);

