export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  _open() {
    this._popup.classList.add('popup_opened');
    this._setClosureEventListeners();
  }

  _close() {
    this._popup.classList.remove('popup_opened');
    this._removeClosureEventListeners();
  }

  _handleCloseOnEsc = (evt) => {
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

  _setClosureEventListeners() {
    this._popup.addEventListener('click', this._handleCloseOnClick);
    window.addEventListener('keydown', this._handleCloseOnEsc);
  }

  _removeClosureEventListeners() {
    this._popup.removeEventListener('click', this._handleCloseOnClick);
    window.removeEventListener('keydown', this._handleCloseOnEsc);
  }
}
