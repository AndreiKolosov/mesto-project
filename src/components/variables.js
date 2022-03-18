const userName = document.querySelector('.profile__name'); // Имя пользователя на странице
const userDescription = document.querySelector('.profile__description'); // Описание пользователя на странице
const userAvatar = document.querySelector('.profile__avatar');
const userInfoForm = document.querySelector('#editor-form'); // Форма редактирования информации о пользователе
const cardsForm = document.querySelector('#card-form'); // Форма добавления карточки
const avatarForm = document.querySelector('#avatar-form'); // форма смены аватара
const confirmForm = document.querySelector('#confirm-form'); // форма подтверждения
const nameInput = userInfoForm.querySelector('#user-name'); // Поле ввода имени
const descriptionInput = userInfoForm.querySelector('#user-description'); // Поле ввода описания
const placeNameInput = cardsForm.querySelector('#place-name'); // Поле ввода имени карточки
const placeLinkInput = cardsForm.querySelector('#place-img-link'); // Поле ввода ссылки на фотографию
const avatarLinkInput = avatarForm.querySelector('#user-avatar'); // Поле ввода ссылки на новый аватар
const confirmIdInput = confirmForm.querySelector('#confirm-input'); // Поле для хранения id удаляемой карточки
const galleryContainer = document.querySelector('.galery__list'); // Контейнер карточек

const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort7',
  headers: {
    authorization: '32e69527-8018-4c7f-823e-614d86c48870',
    'Content-Type': 'application/json',
  },
};

export {
  userName,
  nameInput,
  userDescription,
  descriptionInput,
  placeNameInput,
  placeLinkInput,
  confirmIdInput,
  galleryContainer,
  cardsForm,
  userInfoForm,
  avatarForm,
  confirmForm,
  avatarLinkInput,
  userAvatar,
  config,
};
