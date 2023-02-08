export const initialCards = [
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
export const profilePopup = '.profile-popup';
export const popupAddElement = '.popup_add-cards';
export const popupImgElement = '.popup_open-img';
export const popupUpdateAvatar = '.popup_update-avatar';
export const popupDeleteConfirm = '.popup_confirmation-delete';
//export const closeButtons = document.querySelectorAll('.popup__close-button');

//POPUP EDIT-FORM
export const profileForm = document.querySelector('.popup__form');
export const nameInput =  profileForm.querySelector('.popup__form-edit_substitution_name');
export const jobInput = profileForm.querySelector('.popup__form-edit_substitution_about-me');

export const avatarForm = document.querySelector('.popup__form_update-avatar')
export const avatarLinkInput = avatarForm.querySelector('.popup__form-edit_udate-link');

//POPUP ADD-FORM
export const formAddElement = document.querySelector('.popup__form_add');
export const formInputName = formAddElement.querySelector('.popup__form-edit_name');
export const formInputLink = formAddElement.querySelector('.popup__form-edit_link');

//PROFILE ELEMENTS
export const profileSection = document.querySelector('.profile');
export const profileName = profileSection.querySelector('.profile__name');
export const profileJob = profileSection.querySelector('.profile__about-me');

//BUTTONS EDIT AND ADD
export const profileEditButton = profileSection.querySelector('.profile__edit-button');
export const profileAddButton = profileSection.querySelector('.profile__add-button');
export const profileAvatarUpdateButton = profileSection.querySelector('.profile__avatar-update-button');

//TEMPLATE
export const cardsContainer = '.photo-grid';
export const cardsSelector = document.querySelector('.photo-grid');
export const cadrsTemplate = '.cards-template';

//POPUP IMG
//export const popupCardImg = popupImgElement.querySelector('.popup__image');
//export const popupCardTitle = popupImgElement.querySelector('.popup__img-description');

export const escKeyCode = 'Escape';

export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-edit',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__form_input_type_error',
  errorClass: 'popup__form-error_active'
};
//--------------------------------------------------------------------------------------------
