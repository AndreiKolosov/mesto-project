import Popup from './popup.js';

export default class PopupWithImage extends Popup {

  constructor(popupSelector, handleOpenPopup) {
    super(popupSelector);
    this.handleOpenPopup = handleOpenPopup;
  }
}