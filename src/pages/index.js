import '../pages/index.css';
import { enableValidation, validationConfig } from '../components/validate.js';
import { prepereCards, renderCards } from '../components/cards.js';
import { closePopup } from '../components/utils';
import {
  galleryContainer,
  cardsForm,
  editBtn,
  addBtn,
  editorForm,
} from '../components/variables.js';
import {
  openProfileEditor,
  openCardCreator,
  editorFormHandler,
  cardFormHandler,
} from '../components/modal.js';
import API from '../components/api.js';

API.getCards()
  .then((rawCards) => prepereCards(rawCards))
  .then((markedCards) => renderCards(markedCards, galleryContainer));

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

editBtn.addEventListener('click', openProfileEditor); // Отслеживаю клик по кнопке редактирования
addBtn.addEventListener('click', openCardCreator); // Отслеживаю клик по кнопки добавления
editorForm.addEventListener('submit', editorFormHandler); // Сабмит формы редактирования
cardsForm.addEventListener('submit', cardFormHandler); // Сабмит формы добавления
enableValidation(validationConfig);
