import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm, handleOpenPopup) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._handleOpenForm = handleOpenPopup;
    this._form = this._popup.querySelector('.form');
    this.submitButton = this._form.querySelector('.form__save-button');
    this._inputList = this._form.querySelectorAll('.form__item');
    this._formValues = {};
  }

  _getInputValues() {
    this._inputList.forEach((input) => (this._formValues[input.name] = input.value));
    return this._formValues;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    this._form.addEventListener('submit', () => {
      this._handleSubmitForm();
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
