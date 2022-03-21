import Popup from './popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm, handleOpenPopup, enableValidation) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._handleOpenForm = handleOpenPopup;
    this._enableValidation = enableValidation;
    this._form = this._popup.querySelector('.form');
    this.submitButton = this._form.querySelector('.form__save-button');
    this.formInputs = Array.from(this._form.querySelectorAll('.form__item'));
  }

  
  
  setEventListeners() {
    this._form.addEventListener('submit', () => {
      this._handleSubmitForm();
    });
  }
}