import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.popup__image');
    this._popupCaption = this._popup.querySelector('.popup__img-caption');
  }

  open(card) {
    super.open();
    this._popupImage.src = card.link;
    this._popupImage.alt = card.name;
    this._popupCaption.textContent = card.name;
  }
}
