import { expendPhoto } from '../components/modal.js';

const cardTemplate = document.querySelector('.card-template').content; // Шаблон карточки

function removeCard(event) {
  event.target.closest('.card').remove();
} // Удаление карточки

function addLikeListener(likeBtn) {
  const card = likeBtn.closest('.card'); // понадобится чтобы брать id
  const likeCounter = card.querySelector('.card__like-counter');

  likeBtn.addEventListener('click', () => {
    likeBtn.classList.add('card__like-button_active');
  });
}

function createCardElement(name, link) {
  const cardMarkup = cardTemplate.querySelector('.card').cloneNode(true); // Карточка, склонированная из шаблона
  const removeCardBtn = cardMarkup.querySelector('.card__trash-button'); // Кнопка удаления карточки
  const likeBtn = cardMarkup.querySelector('.card__like-button'); // Кнопка лайк
  const cardName = cardMarkup.querySelector('.card__name'); // Элемент с названием карточки
  const cardImg = cardMarkup.querySelector('.card__image'); // Элемент Img в карточке

  cardName.textContent = name;
  cardImg.src = link;
  cardImg.alt = name;

  addLikeListener(likeBtn);
  removeCardBtn.addEventListener('click', removeCard);
  cardImg.addEventListener('click', expendPhoto);

  return cardMarkup;
}

function renderCards(cards, container) {
  cards.forEach((card) => {
    const markedCard = createCardElement(card.name, card.link);
    container.append(markedCard);
  });
}

export { renderCards, createCardElement };
