import { expendPhoto } from '../components/modal.js';

const cardTemplate = document.querySelector('.card-template').content; // Шаблон карточки

function removeCard(event) {
  event.target.closest('.card').remove();
} // Удаление карточки

function likeCard() {
  this.classList.toggle('card__like-button_active');
} // Лайк

function createCardElement(name, link) {
  const cardMarkup = cardTemplate.querySelector('.card').cloneNode(true); // Карточка, склонированная из шаблона
  const removeCardBtn = cardMarkup.querySelector('.card__trash-button'); // Кнопка удаления карточки
  const likeBtn = cardMarkup.querySelector('.card__like-button'); // Кнопка лайк
  const cardName = cardMarkup.querySelector('.card__name'); // Элемент с названием карточки
  const cardImg = cardMarkup.querySelector('.card__image'); // Элемент Img в карточке

  cardName.textContent = name;
  cardImg.src = link;
  cardImg.alt = name;

  likeBtn.addEventListener('click', likeCard);
  removeCardBtn.addEventListener('click', removeCard);
  cardImg.addEventListener('click', expendPhoto);

  return cardMarkup;
}

function prepereCards(rawCards) {
  const markedCards = rawCards.map((card) => {
    return createCardElement(card.name, card.link);
  });
  return markedCards;
}

function renderCards(cards, container) {
  container.append(...cards);
}

export { prepereCards, renderCards, createCardElement };
