const popupElement = document.querySelector('.popup');
const formElement = popupElement.querySelector('.popup__form');
const nameInput =  formElement.querySelector('.popup__form-edit_substitution_name');
const jobInput = formElement.querySelector('.popup__form-edit_substitution_about-me');
const closeButton = popupElement.querySelector('.popup__close-button');

const profileElements = document.querySelector('.profile');
const profileName = profileElements.querySelector('.profile__name');
const profileJob = profileElements.querySelector('.profile__about-me');
const profileEditButton = profileElements.querySelector('.profile__edit-button')

function openPopup () {
  popupElement.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function closePopup () {
  popupElement.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup ();
}

profileEditButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
// данная строка из шаблона к заданию
formElement.addEventListener('submit', formSubmitHandler);
