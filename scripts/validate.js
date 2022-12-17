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

const checkInputValidity = (formSelector, input, config) => {
  if (!input.validity.valid) {
    showInputError(formSelector, input, input.validationMessage, config);
  } else {
    hideInputError(formSelector, input, config);
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

const setEventListeners = (form, config) => {
  const {inputSelector, submitButtonSelector, ...restConfig} = config;
  const inputList = Array.from(form.querySelectorAll(inputSelector));
  const buttonElement = form.querySelector(submitButtonSelector);

  toggleButtonState(inputList, buttonElement, restConfig)

  inputList.forEach((input) => {
    if(input.classList.contains(config.inputErrorClass)) {
      hideInputError(form, input, config);
    } else {
      input.addEventListener('input', function () {
        checkInputValidity(form, input, restConfig);
        toggleButtonState(inputList, buttonElement, restConfig)
      });
    }
  });
};

export const enableValidation = (config) => {
  const {formSelector, ...restConfig} = config;
  const forms =[...document.querySelectorAll(formSelector)];

  forms.forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault()
    });
    setEventListeners(form, restConfig);
  })
}

export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-edit',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__form_input_type_error',
  errorClass: 'popup__form-error_active'
};

