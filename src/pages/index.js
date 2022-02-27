import '../pages/index.css';
import { closePopup } from '../components/utils.js';
import { enableValidation, validationConfig, disableButton } from '../components/validate.js';
import { renderCards, createCard } from '../components/cards.js';
import {
  userName,
  nameInput,
  userDescription,
  descriptionInput,
  placeNameInput,
  placeLinkInput,
  galleryContainer,
} from '../components/variables.js';
import {
  openProfileEditor,
  openCardCreator,
  editorPopup,
  cardAdderPopup,
} from '../components/modal.js';

const editBtn = document.querySelector('.profile__edit-button'); // Кнопка редактирования профиля
const addBtn = document.querySelector('.profile__add-button'); // Кнопка добавления карточки
const editorForm = document.querySelector('#editor-form'); // Форма редактирования
const cardsForm = document.querySelector('#adder-form'); // Форма добавления карточки

function editorFormHandler(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userDescription.textContent = descriptionInput.value;
  closePopup(editorPopup);
}

function cardFormHandler(evt) {
  evt.preventDefault();
  const createBtn = cardsForm.querySelector('.form__save-button');
  galleryContainer.prepend(createCard(placeNameInput.value, placeLinkInput.value));
  cardsForm.reset();
  disableButton(createBtn, validationConfig);
  closePopup(cardAdderPopup);
}

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
renderCards();
editBtn.addEventListener('click', openProfileEditor); // Отслеживаю клик по кнопке редактирования
addBtn.addEventListener('click', openCardCreator); // Отслеживаю клик по кнопки добавления
editorForm.addEventListener('submit', editorFormHandler); // Сабмит формы редактирования
cardsForm.addEventListener('submit', cardFormHandler); // Сабмит формы добавления
enableValidation(validationConfig);
