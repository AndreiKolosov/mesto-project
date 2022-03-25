import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm, handleOpenPopup) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._handleOpenForm = handleOpenPopup;
    this._form = this._popup.querySelector('.form');
    this.submitButton = this._form.querySelector('.form__save-button');
  }

  setEventListeners() {
    this._form.addEventListener('submit', () => {
      this._handleSubmitForm();
    });
  }

  
}