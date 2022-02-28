const userName = document.querySelector('.profile__name'); // Имя пользователя на странице
const userDescription = document.querySelector('.profile__description'); // Описание пользователя на странице
// const userAvatar = document.querySelector('.profile__avatar');
const userInfEditorForm = document.querySelector('#editor-form'); // Форма редактирования информации о пользователе
const cardsForm = document.querySelector('#card-form'); // Форма добавления карточки
// const avatarForm = document.querySelector('#avatar-form'); // форма смены аватара
const nameInput = userInfEditorForm.querySelector('#user-name'); // Поле ввода имени
const descriptionInput = userInfEditorForm.querySelector('#user-description'); // Поле ввода описания
const placeNameInput = cardsForm.querySelector('#place-name'); // Поле ввода имени карточки
const placeLinkInput = cardsForm.querySelector('#place-img-link'); // Поле ввода ссылки на фотографию
// const avatarLinkInput = avatarForm.querySelector('#user-avatar');
const galleryContainer = document.querySelector('.galery__list'); // Контейнер карточек

export {
  userName,
  nameInput,
  userDescription,
  descriptionInput,
  placeNameInput,
  placeLinkInput,
  galleryContainer,
  cardsForm,
  userInfEditorForm,
  // avatarForm,
  // avatarLinkInput,
  // userAvatar,
};
