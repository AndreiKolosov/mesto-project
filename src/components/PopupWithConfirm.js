import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, handleConfirmation) {
    super(popupSelector);
    this.handleConfirmation = handleConfirmation;
    this.confirmButton = this._popup.querySelector('.form__save-button');
  }

  setEventListener(card) {
    this.confirmButton.addEventListener('click', this.handleConfirmation.bind(this, card));
  }

  removeEventListener(card) {
    console.log('here');
    this.confirmButton.removeEventListener('click', this.handleConfirmation.bind(this, card));
  }
}
