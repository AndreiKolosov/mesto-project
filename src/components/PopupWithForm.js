import Popup from './popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm, handleOpenForm) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._handleOpenForm = handleOpenForm;
  }

  _open() {

    super._open();
  }


  
}