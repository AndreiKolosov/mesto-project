export default class Popup {
  constructor(popupSelector) {
    // this._popupSelector = popupSelector;
    this._popup = document.querySelector(popupSelector);
  }

  _open() {
    this._popup.classList.add('popup_opened');
    this._setEventListeners();
  }

  _close() {
    this._popup.classList.remove('popup_opened');
    this._removeEventListeners();
  }

  _handleCloseOnEsc = (evt) => {
    console.log(evt);
    if (evt.key === 'Escape') {
      this._close();
    }
  };

  _handleCloseOnClick = (evt) => {
    if (
      evt.target.classList.contains('popup__close-button') ||
      evt.target.classList.contains('popup')
    ) {
      this._close();
    }
  };

  _setEventListeners() {
    this._popup.addEventListener('click', this._handleCloseOnClick);
    window.addEventListener('keydown', this._handleCloseOnEsc);
  }

  _removeEventListeners() {
    this._popup.removeEventListener('click', this._handleCloseOnClick);
    window.removeEventListener('keydown', this._handleCloseOnEsc);
  }
}
