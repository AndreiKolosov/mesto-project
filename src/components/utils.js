function openPopup(popup) {
  popup.classList.add('popup_opened'); // Добавляет класс
  document.addEventListener('keydown', pressEsc);
} // Функция открытия модально окна принимающая на вход переменную нужного модального окна

function closePopup(popup) {
  popup.classList.remove('popup_opened'); // Убирает класс
  document.removeEventListener('keydown', pressEsc);
} // Функция закрытия модального окна

function pressEsc(evt) {
  const activePopup = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    closePopup(activePopup);
  }
}

export { openPopup, closePopup };
