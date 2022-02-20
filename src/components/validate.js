const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__item',
  buttonSelector: '.form__save-button',
  buttonInactiveClass: 'form__save-button_disabled',
  errorElementClass: 'form__item-error_active',
  inputErrorClass: 'form__item_type_error',
};

const showInputError = (inputElement, errorElement, errorMessage, config) => {
  inputElement.classList.add(config.inputErrorClass);
  errorElement.classList.add(config.errorElementClass);
  errorElement.textContent = errorMessage;
};

const hideInputError = (inputElement, errorElement, config) => {
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorElementClass);
  errorElement.textContent = '';
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const disableButton = (buttonElement, config) => {
  buttonElement.classList.add(config.buttonInactiveClass);
  buttonElement.disabled = true;
};

const enableButton = (buttonElement, config) => {
  buttonElement.classList.remove(config.buttonInactiveClass);
  buttonElement.disabled = false;
};

const toggleButtonState = (formElement, inputList, config) => {
  const buttonElement = formElement.querySelector(config.buttonSelector);
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement, config);
  } else {
    enableButton(buttonElement, config);
  }
};

const checkInputValidity = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}_error`);
  if (!inputElement.validity.valid) {
    showInputError(inputElement, errorElement, inputElement.validationMessage, config);
  } else {
    hideInputError(inputElement, errorElement, config);
  }
};

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  toggleButtonState(formElement, inputList, config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(formElement, inputList, config);
    });
  });
};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, config);
  });
};

export { enableValidation, validationConfig, disableButton };
