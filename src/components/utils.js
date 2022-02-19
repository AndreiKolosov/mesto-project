const userName = document.querySelector('.profile__name'); // Имя пользователя на странице
const userDescription = document.querySelector('.profile__description'); // Описание пользователя на странице
const nameInput = document.querySelector('#user-name'); // Поле ввода имени
const descriptionInput = document.querySelector('#user-description'); // Поле ввода описания
const placeNameInput = document.querySelector('#place-name'); // Поле ввода имени карточки
const placeLinkInput = document.querySelector('#place-img-link'); // Поле ввода ссылки на фотографию

function openPopup(popup) {
  popup.classList.add('popup_opened'); // Добавляет класс
  document.addEventListener('keydown', pressEsc);
} // Функция открытия модально окна принимающая на вход переменную нужного модального окна

function closePopup(popup) {
  popup.classList.remove('popup_opened'); // Убирает класс
  document.removeEventListener('keydown', pressEsc);
} // Функция закрытия модального окна

function pressEsc(evt) {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup);
  }
}

export { openPopup, closePopup }; // функции
export { userName, nameInput, userDescription, descriptionInput, placeNameInput, placeLinkInput }; // переменные
