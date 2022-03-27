export default class FormValidator {
  constructor(
    formSelector,
    { inputSelector, buttonSelector, buttonInactiveClass, errorElementClass, inputErrorClass }
  ) {
    this._formSelector = formSelector;
    this._inputSelector = inputSelector;
    this._buttonSelector = buttonSelector;
    this._buttonInactiveClass = buttonInactiveClass;
    this._errorElementClass = errorElementClass;
    this._inputErrorClass = inputErrorClass;
  }
  enableValidation() {
    const form = document.querySelector('#' + this._formSelector);

    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners(form);
  }

  resetValidity() {
    const form = document.querySelector('#' + this._formSelector);
    const inputList = Array.from(form.querySelectorAll(this._inputSelector));
    inputList.forEach((inputElement) => {
      this._hideInputError(inputElement, form.querySelector(`.${inputElement.id}_error`));
    });
    this._toggleButtonState(form, inputList);
  }

  _setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
    this._toggleButtonState(formElement, inputList);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(formElement, inputElement);
        this._toggleButtonState(formElement, inputList);
      });
    });
  }

  _checkInputValidity(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}_error`);
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, errorElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement, errorElement);
    }
  }

  _toggleButtonState(formElement, inputList) {
    const buttonElement = formElement.querySelector(this._buttonSelector);
    if (this._hasInvalidInput(inputList)) {
      this._disableButton(buttonElement);
    } else {
      this._enableButton(buttonElement);
    }
  }

  _showInputError(inputElement, errorElement, errorMessage) {
    inputElement.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorElementClass);
    errorElement.textContent = errorMessage;
  }

  _hideInputError(inputElement, errorElement) {
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorElementClass);
    errorElement.textContent = '';
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _disableButton(buttonElement) {
    buttonElement.classList.add(this._buttonInactiveClass);
    buttonElement.disabled = true;
  }

  _enableButton(buttonElement) {
    buttonElement.classList.remove(this._buttonInactiveClass);
    buttonElement.disabled = false;
  }
}
