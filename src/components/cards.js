import { expendPhoto } from '../components/modal.js';
import { galleryContainer } from './variables.js';
import api from './api.js';

const cardTemplate = document.querySelector('.card-template').content; // Шаблон карточки

function removeCard(event) {
  event.target.closest('.card').remove();
} // Удаление карточки

function likeCard() {
  this.classList.toggle('card__like-button_active');
} // Лайк

function createCard(name, link) {
  const cardMarkup = cardTemplate.querySelector('.card').cloneNode(true); // Карточка, склонированная из шаблона
  const removeCardBtn = cardMarkup.querySelector('.card__trash-button'); // Кнопка удаления карточки
  const likeBtn = cardMarkup.querySelector('.card__like-button'); // Кнопка лайк
  const cardName = cardMarkup.querySelector('.card__name'); // Элемент с названием карточки
  const cardImg = cardMarkup.querySelector('.card__image'); // Элемент Img в карточке

  cardName.textContent = name; // Текстовое содержимое тега === параметру name
  cardImg.src = link; // Атрибут src у img становится === параметру link
  cardImg.alt = name; // Атрибут alt у img становится === параметру name

  likeBtn.addEventListener('click', likeCard); // Отслеживаю клик по сердечку
  removeCardBtn.addEventListener('click', removeCard); // Отслеживаю клик по корзине
  cardImg.addEventListener('click', expendPhoto); // Отслеживаю клик по картинке

  return cardMarkup; // Возвращаю созданную карточку
}

function renderCards() {
  api
    .getCards()
    .then((res) => {
      const cards = res.map((elm) => {
        return createCard(elm.name, elm.link);
      });
      return cards;
    })
    .then((cards) => {
      galleryContainer.append(...cards);
    })
    .catch((err) => {
      api.errorHendler(err);
    });
}

export { createCard, renderCards };
