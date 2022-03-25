// Селекторы
const userNameSelector = '.profile__name'; // Имя пользователя на странице
const userDescriptionSelector = '.profile__description'; // Описание пользователя на странице
const userAvatarSelector = '.profile__avatar';
const cardTemplateSelector = '.card-template';
const galleryContainerSelector = '.galery__list';
// Кнопки
const editBtn = document.querySelector('.profile__edit-button'); // Кнопка редактирования профиля
const addBtn = document.querySelector('.profile__add-button'); // Кнопка добавления карточки
const avatarChangeBtn = document.querySelector('.profile__avatar-container'); // Кнопка смены аватара

const apiConfig = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort7',
  headers: {
    authorization: '32e69527-8018-4c7f-823e-614d86c48870',
    'Content-Type': 'application/json',
  },
};

const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__item',
  buttonSelector: '.form__save-button',
  buttonInactiveClass: 'form__save-button_disabled',
  errorElementClass: 'form__item-error_active',
  inputErrorClass: 'form__item_type_error',
};

export {
  userDescriptionSelector,
  userNameSelector,
  userAvatarSelector,
  cardTemplateSelector,
  galleryContainerSelector,
  apiConfig,
  validationConfig,
  editBtn,
  addBtn,
  avatarChangeBtn,
};
