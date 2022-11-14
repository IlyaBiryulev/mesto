const formElement = document.querySelector('.popup');
const nameInput =  formElement.querySelector('.popup__form-edit_name');
const jobInput = formElement.querySelector('.popup__form-edit_about-me');
const closeButton = formElement.querySelector('.popup__close-button');

const profileElements = document.querySelector('.profile');
const profileName = profileElements.querySelector('.profile__name');
const profileJob = profileElements.querySelector('.profile__about-me');
const profileEditButton = profileElements.querySelector('.profile__edit-button')

function popupOpen () {
  formElement.classList.add('popup__opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function popupClose () {
  formElement.classList.remove('popup__opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
  popupClose ()
}

profileEditButton.addEventListener('click', popupOpen);
closeButton.addEventListener('click', popupClose);

formElement.addEventListener('submit', formSubmitHandler);
