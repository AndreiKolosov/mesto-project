import { expendPhoto, openConfirmPopup } from '../components/modal.js';
import API from './api.js';

const myCardTemplate = document.querySelector('.card-template-self').content; // Шаблон карточки
const cardTemplate = document.querySelector('.card-template').content;

function removeCard(evt) {
  const card = evt.target.closest('.card');
  openConfirmPopup(card);
} // Удаление карточки

// !!! Попробовать вынести функции науржу
function addLikeListener(btn) {
  const card = btn.closest('.card');
  const likeCounter = card.querySelector('.card__like-counter');

  btn.addEventListener('click', () => {
    if (btn.classList.contains('card__like-button_active')) {
      API.removeLike(card.id)
        .then((res) => {
          console.log(res, 'rem');
          likeCounter.textContent = res.likes.length;
          likeCounter.classList.remove('card__like-counter_visible');
          btn.classList.remove('card__like-button_active');
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      API.addLike(card.id)
        .then((res) => {
          console.log(res, 'add');
          likeCounter.textContent = res.likes.length;
          likeCounter.classList.add('card__like-counter_visible');
          btn.classList.add('card__like-button_active');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
}

function createCardElement(card, isMy = true, likedByMe = false) {
  const cardMarkup = isMy
    ? myCardTemplate.querySelector('.card').cloneNode(true)
    : cardTemplate.querySelector('.card').cloneNode(true);
  const likeBtn = cardMarkup.querySelector('.card__like-button'); // Кнопка лайк
  const cardName = cardMarkup.querySelector('.card__name'); // Элемент с названием карточки
  const cardImg = cardMarkup.querySelector('.card__image'); // Элемент Img в карточке
  const likeCounter = cardMarkup.querySelector('.card__like-counter');

  cardMarkup.id = card._id;
  cardName.textContent = card.name;
  cardImg.src = card.link;
  cardImg.alt = card.name;

  if (isMy) {
    cardMarkup.querySelector('.card__trash-button').addEventListener('click', removeCard);
  }

  if (card.likes.length > 0) {
    likeCounter.classList.add('card__like-counter_visible');
    likeCounter.textContent = card.likes.length;
  }

  if (likedByMe) {
    likeBtn.classList.add('card__like-button_active');
  }

  addLikeListener(likeBtn);
  cardImg.addEventListener('click', expendPhoto);
  return cardMarkup;
}

function renderCards(cards, userId, container) {
  cards.forEach((card) => {
    const isMy = card.owner._id === userId;
    const likedByMe = Boolean(card.likes.find((like) => like._id === userId));
    const markedCard = createCardElement(card, isMy, likedByMe);
    container.append(markedCard);
  });
}

export { renderCards, createCardElement };
