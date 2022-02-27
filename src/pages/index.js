import '../pages/index.css';
import { enableValidation, validationConfig } from '../components/validate.js';
import { prepereCards, renderCards } from '../components/cards.js';
import { closePopup } from '../components/utils';
import {
  galleryContainer,
  cardsForm,
  userInfEditorForm,
  avatarForm,
} from '../components/variables.js';
import {
  openProfileEditor,
  openCardCreator,
  openAvatarEditor,
  userFormHandler,
  cardFormHandler,
  avatarFormHandler,
} from '../components/modal.js';
import API from '../components/api.js';

const editBtn = document.querySelector('.profile__edit-button'); // Кнопка редактирования профиля
const addBtn = document.querySelector('.profile__add-button'); // Кнопка добавления карточки
const changeAvatarBtn = document.querySelector('.profile__change-ava-btn'); // Кнопка смены аватара

const popups = Array.from(document.querySelectorAll('.popup')).forEach((element) => {
  element.addEventListener('click', (evt) => {
    if (
      evt.target.classList.contains('popup__close-button') ||
      evt.target.classList.contains('popup')
    ) {
      closePopup(element);
    }
  });
});

API.getCards()
  .then((rawCards) => prepereCards(rawCards))
  .then((markedCards) => renderCards(markedCards, galleryContainer));

changeAvatarBtn.addEventListener('click', openAvatarEditor);
editBtn.addEventListener('click', openProfileEditor);
addBtn.addEventListener('click', openCardCreator);
userInfEditorForm.addEventListener('submit', userFormHandler);
cardsForm.addEventListener('submit', cardFormHandler);
avatarForm.addEventListener('submit', avatarFormHandler);
enableValidation(validationConfig);
