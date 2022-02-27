const userName = document.querySelector('.profile__name'); // Имя пользователя на странице
const userDescription = document.querySelector('.profile__description'); // Описание пользователя на странице
const nameInput = document.querySelector('#user-name'); // Поле ввода имени
const descriptionInput = document.querySelector('#user-description'); // Поле ввода описания
const placeNameInput = document.querySelector('#place-name'); // Поле ввода имени карточки
const placeLinkInput = document.querySelector('#place-img-link'); // Поле ввода ссылки на фотографию
const galleryContainer = document.querySelector('.galery__list'); // Контейнер карточек
const cardsForm = document.querySelector('#adder-form'); // Форма добавления карточки
const editBtn = document.querySelector('.profile__edit-button'); // Кнопка редактирования профиля
const addBtn = document.querySelector('.profile__add-button'); // Кнопка добавления карточки
const editorForm = document.querySelector('#editor-form'); // Форма редактирования

export {
  userName,
  nameInput,
  userDescription,
  descriptionInput,
  placeNameInput,
  placeLinkInput,
  galleryContainer,
  cardsForm,
  editBtn,
  addBtn,
  editorForm,
};
