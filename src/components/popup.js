export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add('popup_opened');
    this._setClosureEventListeners();
  }

  close() {
    this._popup.classList.remove('popup_opened');
    this._removeClosureEventListeners();
  }

  _handleCloseOnEsc = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  };

  _handleCloseOnClick = (evt) => {
    if (
      evt.target.classList.contains('popup__close-button') ||
      evt.target.classList.contains('popup')
    ) {
      this.close();
    }
  };

  _setClosureEventListeners() {
    this._popup.addEventListener('mousedown', this._handleCloseOnClick);
    window.addEventListener('keydown', this._handleCloseOnEsc);
  }

  _removeClosureEventListeners() {
    this._popup.removeEventListener('mousedown', this._handleCloseOnClick);
    window.removeEventListener('keydown', this._handleCloseOnEsc);
  }
}
