import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, handleConfirmation) {
    super(popupSelector);
    this.handleConfirmation = handleConfirmation;
    this.confirmButton = this._popup.querySelector('.form__save-button');
    this.cardId = '';
  }

  setEventListener() {
    this.confirmButton.addEventListener('click', this.handleConfirmation.bind(this, this.cardId));
  }

  // removeEventListener(card) {
  //   console.log('here');
  //   this.confirmButton.removeEventListener('click', this.handleConfirmation.bind(this, card));
  // }

  // setConfirmAction(action) {
  //   this.confirmButton.addEventListener('click', action);
  // }

  // removeConfirmAction(action) {
  //   this.confirmButton.removeEventListener('click', action);
  // }

}
