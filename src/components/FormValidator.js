export default class FormValidator {
  constructor(
    formElement,
    { inputSelector, buttonSelector, buttonInactiveClass, errorElementClass, inputErrorClass }
  ) {
    this._form = formElement;
    this._inputSelector = inputSelector;
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._buttonSelector = buttonSelector;
    this._buttonElement = this._form.querySelector(this._buttonSelector);
    this._buttonInactiveClass = buttonInactiveClass;
    this._errorElementClass = errorElementClass;
    this._inputErrorClass = inputErrorClass;
  }
  enableValidation() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

  resetValidity() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement, this._form.querySelector(`.${inputElement.id}_error`));
    });
    this._toggleButtonState();
  }

  _setEventListeners() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  _checkInputValidity(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}_error`);
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, errorElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement, errorElement);
    }
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableButton();
    } else {
      this._enableButton();
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

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _disableButton() {
    this._buttonElement.classList.add(this._buttonInactiveClass);
    this._buttonElement.disabled = true;
  }

  _enableButton() {
    this._buttonElement.classList.remove(this._buttonInactiveClass);
    this._buttonElement.disabled = false;
  }
}
