//ERROR
//FUNC SHOW ERROR
const showInputError = (form, input, errorMessage, config) => {
  const {inputErrorClass, errorClass} = config;
  const errorElement = form.querySelector(`.${input.id}-error`);

  input.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};
//FUNC HIDE ERROR
const hideInputError = (form, input, config) => {
  const {inputErrorClass, errorClass} = config;
  const errorElement = form.querySelector(`.${input.id}-error`);

  input.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (form, input, config) => {
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage, config);
  } else {
    hideInputError(form, input, config);
  }
};

function hasInvalidInput(inputList) {
  return inputList.some((input) => {
    return !input.validity.valid;
  })
}

const toggleButtonState = (inputlist, buttonElement, config) => {
  const {inactiveButtonClass} = config;

  if (hasInvalidInput(inputlist)) {
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

  form.addEventListener('reset', () => {
    setTimeout(() => {
      toggleButtonState(inputList, buttonElement, restConfig);
    }, 0)
  })

  inputList.forEach((input) => {
    input.addEventListener('input', function () {
      checkInputValidity(form, input, restConfig);
      toggleButtonState(inputList, buttonElement, restConfig)
    });
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
