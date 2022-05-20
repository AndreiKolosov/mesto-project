export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add('popup_opened');
    window.addEventListener('keydown', this._handleCloseOnEsc);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    window.removeEventListener('keydown', this._handleCloseOnEsc);
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

  setEventListeners() {
    this._popup.addEventListener('mousedown', this._handleCloseOnClick);
  }
}
