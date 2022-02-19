import '../pages/index.css';
import { closePopup } from '../components/utils.js';
import {
  userName,
  nameInput,
  userDescription,
  descriptionInput,
  placeNameInput,
  placeLinkInput,
} from '../components/variables.js';
import { enableValidation, validationConfig } from '../components/validate.js';
import { newCards, createCard } from '../components/cards.js';
import { openProfileEditor, openCardCreator, editorPopup, cardAdderPopup } from '../components/modal.js';

const editBtn = document.querySelector('.profile__edit-button'); // Кнопка редактирования профиля
const addBtn = document.querySelector('.profile__add-button'); // Кнопка добавления карточки
const editorForm = document.querySelector('#editor-form'); // Форма редактирования
const cardsForm = document.querySelector('#adder-form'); // Форма добавления карточки
const galleryContainer = document.querySelector('.galery__list'); // Контейнер карточек

function submitEditorForm(evt) {
  userName.textContent = nameInput.value; // Значение value поля ввода === текстовому содержимому тега на странице
  userDescription.textContent = descriptionInput.value; // Аналогично верхнему
  closePopup(editorPopup);
} // Форма редактирования профиля

function submitAdderForm(evt) {
  galleryContainer.prepend(createCard(placeNameInput.value, placeLinkInput.value)); // Отправляю value импутов в качестве параметров фунции, создаю карточку, кладу в начало списка
  // Делаю импуты пустыми после закрытия
  cardsForm.reset();
  closePopup(cardAdderPopup);
}

const popups = Array.from(document.querySelectorAll('.popup')).forEach((element) => {
  element.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup__close-button') || evt.target.classList.contains('popup')) {
      closePopup(element);
    }
  });
});

galleryContainer.append(...newCards); // Вставляю карточки спредом
editBtn.addEventListener('click', openProfileEditor); // Отслеживаю клик по кнопке редактирования
addBtn.addEventListener('click', openCardCreator); // Отслеживаю клик по кнопки добавления
editorForm.addEventListener('submit', submitEditorForm); // Сабмит формы редактирования
cardsForm.addEventListener('submit', submitAdderForm); // Сабмит формы добавления
enableValidation(validationConfig);
