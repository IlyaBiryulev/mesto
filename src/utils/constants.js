//POPUP OPEN/CLOSE
export const profilePopupSelector = '.profile-popup';
export const popupAddElementSelector = '.popup_add-cards';
export const popupImgElementSelector = '.popup_open-img';
export const popupUpdateAvatarSelector = '.popup_update-avatar';
export const popupDeleteConfirmSelector = '.popup_confirmation-delete';

//POPUP EDIT-FORM
export const profileForm = document.querySelector('.popup__form');
export const nameInput =  profileForm.querySelector('.popup__form-edit_substitution_name');
export const jobInput = profileForm.querySelector('.popup__form-edit_substitution_about-me');

export const avatarForm = document.querySelector('.popup__form_update-avatar')
export const avatarLinkInput = avatarForm.querySelector('.popup__form-edit_udate-link');

//POPUP ADD-FORM
export const formAddElement = document.querySelector('.popup__form_add');
//PROFILE ELEMENTS
export const profileSection = document.querySelector('.profile');

//BUTTONS EDIT AND ADD
export const profileEditButton = profileSection.querySelector('.profile__edit-button');
export const profileAddButton = profileSection.querySelector('.profile__add-button');
export const profileAvatarUpdateButton = profileSection.querySelector('.profile__avatar-update-button');

//TEMPLATE
export const cardsContainer = '.photo-grid';
export const cards = document.querySelector('.photo-grid');
export const cadrsTemplate = '.cards-template';


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
