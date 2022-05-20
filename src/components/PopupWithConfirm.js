import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, handleConfirmation) {
    super(popupSelector);
    this.handleConfirmation = handleConfirmation;
    this.confirmButton = this._popup.querySelector('.form__save-button');
    this.cardId = '';
  }

   setEventListeners() {
    super.setEventListeners();
    this.confirmButton.addEventListener('click', this.handleConfirmation.bind(this, this.cardId));
  }

  renderLoading(isLoading, buttonText='Да') {
    if (isLoading) {
      this.confirmButton.textContent = 'Удаление...';
    }
    else {
      this.confirmButton.textContent = buttonText;
    }
  }
}
