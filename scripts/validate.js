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

const toggleButtonState = (input, buttonElement, config) => {
  const {inactiveButtonClass} = config;

  if (hasInvalidInput(input)) {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.disabled = 'disable'
  } else {
  buttonElement.classList.remove(inactiveButtonClass);
  buttonElement.disabled = ''
  }
}

const setEventListeners = (form, config) => {
  const {input, submitButton, ...restConfig} = config;
  const inputList = Array.from(form.querySelectorAll(input));
  const buttonElement = form.querySelector(submitButton);

  toggleButtonState(inputList, buttonElement, restConfig)

  inputList.forEach((input) => {
    if(input.classList.contains(config.inputErrorClass)) {
      hideInputError(form, input, config);
    } else {
      input.addEventListener('input', function () {
      checkInputValidity(form, input, restConfig);
      toggleButtonState(inputList, buttonElement, restConfig)});
    }
  });
};

export const enableValidation = (config) => {
  const {form, ...restConfig} = config;
  const forms =[...document.querySelectorAll(form)];

  forms.forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault()
    });
    setEventListeners(form, restConfig);
  })
}

export const config = {
  form: '.popup__form',
  input: '.popup__form-edit',
  submitButton: '.popup__submit-button',
  inactiveButtonClass: 'popup__form-button-submit_disabled',
  inputErrorClass: 'popup__form_input_type_error',
  errorClass: 'popup__form-error_active'
};
