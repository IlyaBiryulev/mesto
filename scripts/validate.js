//ERROR
//FUNC SHOW ERROR
const showInputError = (formSelector, inputSelector, errorMessage, config) => {
  const {inputErrorClass, errorClass} = config;
  const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);

  inputSelector.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};
//FUNC HIDE ERROR
const hideInputError = (formSelector, inputSelector, config) => {
  const {inputErrorClass, errorClass} = config;
  const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);

  inputSelector.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formSelector, inputSelector, config) => {
  if (!inputSelector.validity.valid) {
    showInputError(formSelector, inputSelector, inputSelector.validationMessage, config);
  } else {
    hideInputError(formSelector, inputSelector, config);
  }
};

function hasInvalidInput(inputList) {
  return inputList.some((inputSelector) => {
    return !inputSelector.validity.valid;
  })
}

const toggleButtonState = (inputSelector, buttonElement, config) => {
  const {inactiveButtonClass} = config;

  if (hasInvalidInput(inputSelector)) {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.disabled = 'disable'
  } else {
  buttonElement.classList.remove(inactiveButtonClass);
  buttonElement.disabled = ''
  }
}

const setEventListeners = (formSelector, config) => {
  const {inputSelector, submitButtonSelector, ...restConfig} = config;
  const inputList = Array.from(formSelector.querySelectorAll(inputSelector));
  const buttonElement = formSelector.querySelector(submitButtonSelector);

  toggleButtonState(inputList, buttonElement, restConfig)

  inputList.forEach((inputSelector) => {
      inputSelector.addEventListener('input', function () {
      checkInputValidity(formSelector, inputSelector, restConfig);
      toggleButtonState(inputList, buttonElement, restConfig)
    });
  });
};

const enableValidation = (config) => {
  const {formSelector, ...restConfig} = config;
  const forms =[...document.querySelectorAll(formSelector)];

  forms.forEach((formSelector) => {
    formSelector.addEventListener('submit', (e) => {
      e.preventDefault()
    });
    setEventListeners(formSelector, restConfig);
  })
}

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-edit',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__form-btn-submit_disabled',
  inputErrorClass: 'popup__form_input_type_error',
  errorClass: 'popup__form-error_active'
};

enableValidation(config);
