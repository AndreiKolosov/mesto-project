import Popup from './popup.js';

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
        this.confirmButton.removeEventListener('click', this.handleConfirmation.bind(this, card));
    }

    _open() {
        this._popup.classList.add('popup_opened');
        this._setClosureEventListeners();
      }

      _setClosureEventListeners() {

      }

   
    _close(card) {
        super._close();
        this.removeEventListener(card);
    }
}