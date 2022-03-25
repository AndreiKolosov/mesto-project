export default class FormValidator {
  constructor(
    {
      formSelector,
      inputSelector,
      buttonSelector,
      buttonInactiveClass,
      errorElementClass,
      inputErrorClass,
    },
    resetValidity
  ) {
    this._formSelector = formSelector;
    this._inputSelector = inputSelector;
    this._buttonSelector = buttonSelector;
    this._buttonInactiveClass = buttonInactiveClass;
    this._errorElementClass = errorElementClass;
    this._inputErrorClass = inputErrorClass;
    this.resetValidity = resetValidity;
  }
  enableValidation() {
    const formList = Array.from(document.querySelectorAll(this._formSelector));

    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      this._setEventListeners(formElement);
    });
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



